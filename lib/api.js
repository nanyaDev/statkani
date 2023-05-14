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
    url = json.pages.next_url;
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

  if (endpoint === 'subjects') {
    // todo
  }
};

const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
