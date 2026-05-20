import axios from 'axios'

export const indexSites = () => {
  return axios({
    url: '/api/sites',
  })
}
export const getSite = (id) => {
  return axios({
    url: '/api/sites/' + id,
  })
}

export const createSite = () => {
  return axios({
    url: '/api/sites',
    method: 'post',
    data: { site: { } },
  })
}

export const updateSite = (siteId, data) => {
  return axios({
    url: `/api/sites/${siteId}`,
    method: 'patch',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const deleteSite = (siteId) => {
  return axios({
    url: `/api/sites/${siteId}`,
    method: 'delete',
  })
}
