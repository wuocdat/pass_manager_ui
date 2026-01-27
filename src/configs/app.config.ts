import {LayoutTypes} from "@/@types/layout";

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  enableMock: boolean
  locale: string
  layoutType: LayoutTypes,
}

const apiPrefix = import.meta.env.VITE_API_PREFIX || 'http://localhost:3000'
const enableMock =
  typeof import.meta.env.VITE_ENABLE_MOCK === 'string'
    ? import.meta.env.VITE_ENABLE_MOCK.toLowerCase() === 'true'
    : false

const appConfig: AppConfig = {
  layoutType: LayoutTypes.CollapsibleAppShell,
  apiPrefix,
  authenticatedEntryPath: '/vault',
  unAuthenticatedEntryPath: '/sign-in',
  enableMock,
  locale: 'en',
}

export default appConfig
