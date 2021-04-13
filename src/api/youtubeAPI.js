import axios from 'axios'

export function getSearchRes(query) {
  return axios.get(`https://young-oasis-52093.herokuapp.com/search?q=${query}`)
}

export function getSong(songId) {
  return axios.get(`https://young-oasis-52093.herokuapp.com/song?id=${songId}`)
}
