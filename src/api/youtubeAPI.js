import axios from 'axios'

export function getSearchRes(query) {
  return axios.get(`https://musiicplayer-api.herokuapp.com/search?q=${query}`)
}

export function getSong(songId) {
  return axios.get(`https://musiicplayer-api.herokuapp.com/song?id=${songId}`)
}
