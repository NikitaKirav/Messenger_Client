/** Absolute imports */
import axios from "axios";

export const createCancelToken = () => {
  const source = axios.CancelToken.source();
  const { token: cancelToken } = source;
  return {
    source,
    cancelToken,
  };
};

export const getClickableLink = (link: string) => {
  return link.startsWith("http://") || link.startsWith("https://") ?
    link
    : `//${link}`;
};

/** shortens the link to the specified number of characters 
 * Params:
 * link -> (example) https://stackoverflow.com/questions/56858150/i-am-gettiing-an-error-expected-new-line-while-compiling-sass
 * numberSymbols -> (example) 30
 * 
 * return -> https://stackoverflow.com/ques...
*/
export const trimLink = (link: string, numberSymbols = 30) => {
  var sliced = link.slice(0,numberSymbols);
  if (sliced.length < link.length) {
    sliced += '...';
    return sliced;
  }
  return link;
};
