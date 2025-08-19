/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string
  readonly VITE_PIMLICO_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}