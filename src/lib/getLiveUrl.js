import isLocalEnv from "./isLocalEnv"

const getLiveUrl = (subdomain) => {
  if (isLocalEnv()) {
    return 'http://localhost:8080/live/' + subdomain
  }

  return `https://${subdomain}.squeezer.eronsalling.me`
}

export default getLiveUrl
