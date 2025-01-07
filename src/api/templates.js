import axios from "axios"

export const getSiteTemplate = (template) => axios.get(`/api/templates/${template}/index.hbs`);
export const getSiteCss = template => axios.get(`/api/templates/${template}/styles/site.css`);
export const getBaseCssVars = template => axios.get(`/api/templates/${template}/styles/baseVariables.css`);
export const getUserCssVars = template => axios.get(`/api/templates/${template}/styles/userVariables.css`);
