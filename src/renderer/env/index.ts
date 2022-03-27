const DEVELOPMENT = 'development'
const PRODUCTION = 'production'

let env: typeof DEVELOPMENT | typeof PRODUCTION = DEVELOPMENT

export const setEnv = (isDev: boolean) => {
  if (env === DEVELOPMENT && isDev) return
  env = isDev ? DEVELOPMENT : PRODUCTION
}

export const getEnv = () => {
  return env
}
