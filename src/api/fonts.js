import axios from 'axios'

export const getFonts = (user) => {
  return axios({
    url: '/api/fonts',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
