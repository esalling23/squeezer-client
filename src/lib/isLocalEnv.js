const isLocalEnv = () => {
  return window.location.hostname === 'localhost'
}

export default isLocalEnv