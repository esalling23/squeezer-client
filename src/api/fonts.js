import axios from 'axios'

export const getFonts = () => {
  return axios({
    url: '/api/fonts',
  })
}
