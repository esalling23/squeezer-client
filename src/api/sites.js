import axios from 'axios'
// import apiUrl from '../apiConfig'

export const indexSites = (user) => {
  return axios({
    url: '/sites',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createSite = (user) => {
  return axios({
    url: '/sites',
    method: 'post',
    data: { site: {} },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateSite = (user, siteId, data) => {
  return axios({
    url: `/sites/${siteId}`,
    method: 'patch',
    data: data,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const removeSite = (user, siteId) => {
  return axios({
    url: `/sites/${siteId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
