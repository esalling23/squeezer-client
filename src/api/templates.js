import axios from "axios"

export const getSiteTemplate = (template) => axios.get(`/api/templates/${template}/index.hbs`);
export const getSiteCss = template => axios.get(`/api/templates/${template}/styles/site.css`);
export const getSiteVariables = template => axios.get(`/api/templates/${template}/styles/variables.css`);
