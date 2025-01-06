import axios from 'axios'
// import apiUrl from '../apiConfig'

const baseUrl = siteId => `/api/leads/${siteId}`

export const indexLeads = (user, siteId) => {
  return axios({
    url: baseUrl(siteId),
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const getLead = (user, siteId, leadId) => {
  return axios({
    url: `${baseUrl(siteId)}/${leadId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
