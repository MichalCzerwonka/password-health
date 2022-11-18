import qs from 'query-string';
import { URL } from "~/constants";

const getUrl = (endpoint: URL, params?: Record<string, any>) => {

  const query = qs.stringify(params);

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`
};

export default getUrl;
