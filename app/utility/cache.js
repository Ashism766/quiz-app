
const cacheStore = {};

const setCache = async (cacheKey, data, expirationTime) => {
    console.log("setting cache")
  const cacheData = {
    data,
    expiresAt: Date.now() + expirationTime,
  };
  cacheStore[cacheKey] = cacheData;
};

const getCache = async (cacheKey) => {
    console.log('getting cache')
  const cacheData = cacheStore[cacheKey];
  if (cacheData && cacheData.expiresAt > Date.now()) {
    return cacheData.data;
  }

  return null;
};

export {
    getCache,
    setCache
};