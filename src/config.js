// config.js
const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_API_URL_DEV;
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.REACT_APP_API_URL_PRODUCTION;
    } else {
      // Default to a fallback URL or handle the case as needed.
    }
  };
  
  export default getApiUrl;
  