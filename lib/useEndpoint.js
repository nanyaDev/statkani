import { useState, useEffect } from 'react';
import localforage from 'localforage';

import { useAuth } from './auth';
import toQueryString from '@/utils/toQueryString';

let baseURL = 'https://api.wanikani.com/v2';

const useEndpoint = (endpoint) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchEndpoint = async (endpoint) => {
      let cacheData = [];
      let apiData = [];
      let url = `${baseURL}/${endpoint}`;

      // set query parameters
      const queryParams = {};

      // note: this doesn't handle edge case when previously unhidden item becomes hidden
      if (['assignments', 'subjects', 'review_statistics'].includes(endpoint)) {
        queryParams.hidden = false;
      }

      // note: need to get user.level for this to work
      // if (endpoint === 'assignments') {
      //   queryParams.levels = Array.from({ length: user.level }, (_, i) => i + 1).toString();
      // }

      // get cache data
      try {
        const cache = await localforage.getItem(endpoint);

        if (cache) {
          cacheData = cache.data || [];
          queryParams.updated_after = cache.lastUpdated;
        }
      } catch (error) {
        console.log(error);
      }

      // get new data from API
      url = url + toQueryString(queryParams);
      while (url) {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
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

        setProgress(apiData.length / json.total_count || 1);

        // this is hack to make fetchEndpoint work for collections and singulars
        // might be better to use conditional requests for singular resources
        // cf. https://docs.api.wanikani.com/20170710/#conditional-requests
        if (json.object !== 'collection') {
          cacheData = [];
        }
      }

      // process data
      apiData = formatData(endpoint, apiData);
      const data = mergeData(endpoint, cacheData, apiData);

      // update cache
      const lastUpdated = new Date().toISOString();

      try {
        await localforage.setItem(endpoint, { data, lastUpdated });
      } catch (error) {
        console.log(error);
      }

      setData(data);
    };

    if (token) {
      fetchEndpoint(endpoint);
    }
  }, [endpoint, token]);

  return [progress, data];
};

export default useEndpoint;

// HELPERS
const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

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

const mergeData = (endpoint, a, b) => {
  if (['assignments', 'subjects', 'review_statistics'].includes(endpoint)) {
    return a.filter((aa) => !b.find((bb) => aa.id === bb.id)).concat(b);
  } else {
    return a.concat(b);
  }
};
