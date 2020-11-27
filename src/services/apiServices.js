const PANDASCORE_API_KEY =
  "6xr3TElj5TMvO1KnMjvLY-lE1RE6pR4n_s-0BH356JJTccW4ees";
/**
 * initial fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function initialFetch() {
  return fetch(
    ` https://api.pandascore.co/lol/champions?&token=${PANDASCORE_API_KEY}`,
    { mode: "cors" }
  ).then((response) => response.json());
}

/**
 * search fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function searchFetch(searchedText) {
  return fetch(
    `https://api.pandascore.co/lol/champions?&search[name]=${searchedText}&token=${PANDASCORE_API_KEY}`,
    { mode: "cors" }
  ).then((response) => response.json());
}
