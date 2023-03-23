const API_URL = 'http://localhost:3000'

export function fetchApi(path, data) { 
  return fetch(API_URL + path, data); 
}
