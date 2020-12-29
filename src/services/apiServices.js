const URL_CONSTANT = "https://api.pandascore.co/lol/champions?&";
const PANDASCORE_API_KEY =
  "6xr3TElj5TMvO1KnMjvLY-lE1RE6pR4n_s-0BH356JJTccW4ees";
/**
 * initial fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function initialFetch() {
  const url = `${URL_CONSTANT}token=${PANDASCORE_API_KEY}`;
  return fetch(url).then((response) => response.json());
}

/**
 * search fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function searchFetch(searchedText) {
  const url = `${URL_CONSTANT}search[name]=${searchedText}&token=${PANDASCORE_API_KEY}`;
  return fetch(url).then((response) => response.json());
}
