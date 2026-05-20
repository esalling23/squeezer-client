import axios from 'axios'

const baseUrl = siteId => `/api/leads/${siteId}`

export const indexLeads = (siteId) => {
  return axios({
    url: baseUrl(siteId),
  })
}

export const getLead = (siteId, leadId) => {
  return axios({
    url: `${baseUrl(siteId)}/${leadId}`,
  })
}
