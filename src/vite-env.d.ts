/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string
  readonly VITE_PIMLICO_KEY: string
  readonly VITE_DEFAULT_ERC20_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}