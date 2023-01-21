export function fetchCountries(searchQuery) {
    return fetch(
      `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`
    ).then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  
  // export default  class NewsApiService {
  // constructor () {
  //   this.searchQuery = "";
  // }
  
  // fetchCountries() {
  //   const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
  
  //   fetch(url).then(response => {
  //     if (!response.ok) {
  //       if (response.status === 404) {
  //         return [];
  //       }
  //       throw new Error(response.status);
  //     }
  //     return response.json()
  //   })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }
  
  // get query () {
  //   return this.searchQuery;
  // };
  
  // set query (newQuery) {
  //   this.searchQuery = newQuery;
  // }
  // };
  