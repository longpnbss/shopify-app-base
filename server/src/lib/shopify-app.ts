import '@shopify/shopify-api/adapters/node'
import { ApiVersion, LogSeverity } from '@shopify/shopify-api'
import { shopifyApp } from '@shopify/shopify-app-express'
import { STSessionStorage } from './st-sessions'

const apiConfig = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(','),
  hostName: process.env.HOST.replace(/https?:\/\//, ''),
  hostScheme: process.env.HOST.split('://')[0] as 'https',
  apiVersion: ApiVersion.July24,
  isEmbeddedApp: true,
  logger: {
    level: LogSeverity.Info,
  },
}
const shopify = shopifyApp({
  api: apiConfig,
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    // We are going to use nest js to handle this in webhooks.controller.ts
    path: '/api/webhooks',
  },
  sessionStorage: new STSessionStorage(),
})

export default shopify
