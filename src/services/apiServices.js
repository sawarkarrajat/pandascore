/**
 * initial fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function initialFetch() {
  return fetch(
    "https://api.pandascore.co/lol/champions?&token=" +
      process.env.REACT_APP_PANDASCORE_API_KEY
  ).then((response) => response.json());
}

/**
 * search fetch method
 * @property {Function}
 * @returns {Promise}
 */
export function searchFetch(searchedText) {
  return fetch(
    `https://api.pandascore.co/lol/champions?&search[name]=${searchedText}&token=` +
      process.env.REACT_APP_PANDASCORE_API_KEY
  ).then((response) => response.json());
}
