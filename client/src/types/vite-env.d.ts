interface ImportMetaEnv {
    VITE_API_URL: string;
    VITE_API_PORT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }