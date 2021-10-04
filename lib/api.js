import localforage from 'localforage';

let baseURL = 'https://api.wanikani.com/v2';
let apiToken = null;

export const setToken = (token) => {
  apiToken = token;
};

export const fetchEndpoint = async (endpoint) => {
  let cacheData = [];
  let apiData = [];
  let url = `${baseURL}/${endpoint}`;

  // get cache data
  try {
    const cache = await localforage.getItem(endpoint);

    if (cache) {
      cacheData = cache.data || [];
      url += `?updated_after=${cache.lastUpdated}`;
    }
  } catch (error) {
    console.log(error);
  }

  // get new data from API
  while (url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (response.status === 429) {
      await sleep(5);
      continue;
    } else if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    apiData = apiData.concat(json.data);
    url = json.pages?.next_url || null;

    if (json.object !== 'collection') {
      // this is hack to make fetchEndpooint work for collections and singulars
      // might be better to use conditional requests for singular resources
      // cf. https://docs.api.wanikani.com/20170710/#conditional-requests
      cacheData = [];
    }
  }

  // update cache
  const lastUpdated = new Date().toISOString();
  apiData = formatData(endpoint, apiData);
  const data = cacheData.concat(apiData);

  try {
    await localforage.setItem(endpoint, { data, lastUpdated });
  } catch (error) {
    console.log(error);
  }

  return data;
};

/* HELPERS */
const formatData = (endpoint, newData) => {
  if (endpoint === 'user') {
    const data = newData[0];
    return { start: data.started_at, level: data.level };
  }

  if (endpoint === 'level_progressions') {
    return newData.map(({ data }) => ({
      level: data.level,
      start: data.unlocked_at,
      end: data.passed_at,
    }));
  }

  if (endpoint === 'subjects') {
    return newData.map(({ id, object, data }) => ({
      id: id,
      type: object,
    }));
  }

  if (endpoint === 'reviews') {
    return newData.map(({ data }) => ({
      timestamp: data.created_at,
      isCorrect: data.ending_srs_stage > data.starting_srs_stage,
    }));
  }

  if (endpoint === 'assignments') {
    return newData.map(({ data }) => ({
      id: data.subject_id,
      type: data.subject_type,
      stage: data.srs_stage,
    }));
  }

  if (endpoint === 'review_statistics') {
    // prettier-ignore
    return newData.map(({ data }) => ({
      id: data.subject_id,
      type: data.subject_type,
      mc: data.meaning_correct,
      mi: data.meaning_incorrect,
      rc: data.reading_correct,
      ri: data.reading_incorrect,
    }));
  }
};

const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
