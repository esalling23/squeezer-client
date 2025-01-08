import axios from 'axios'
// import apiUrl from '../apiConfig'

export const indexSites = (user) => {
  return axios({
    url: '/api/sites',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const getSite = (user, id) => {
  return axios({
    url: '/api/sites/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createSite = (user) => {
  return axios({
    url: '/api/sites',
    method: 'post',
    data: { site: { } },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateSite = (user, siteId, data) => {
  return axios({
    url: `/api/sites/${siteId}`,
    method: 'patch',
    data,
    headers: {
      'Content-Type': 'multipart/form-data', 
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteSite = (user, siteId) => {
  return axios({
    url: `/api/sites/${siteId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
