/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CLERK_PUBLISHABLE_KEY: string;
  readonly uri: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
