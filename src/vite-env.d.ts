/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TOKEN_ADDRESS: string
  readonly VITE_TOKEN_DECIMALS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
