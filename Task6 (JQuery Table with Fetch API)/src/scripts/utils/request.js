const request = (url, options) => fetch(url, options)
  .then(response => response.json())
  .catch(error => console.log(`error: ${error}`));

export { request };
