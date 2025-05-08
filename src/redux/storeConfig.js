// Configuration du store Redux / Redux store configuration
export const storeConfig = {
  // Configuration du middleware / Middleware configuration
  middleware: {
    // Options pour Thunk / Thunk options
    thunk: {
      extraArgument: {
        api: process.env.REACT_APP_API_URL || 'http://localhost',
      }
    }
  },

  // Configuration des outils de développement / Development tools configuration
  devTools: {
    // Activer uniquement en développement / Enable only in development
    enabled: process.env.NODE_ENV === 'development',
    // Options des outils de développement / DevTools options
    options: {
      trace: true,
      traceLimit: 25
    }
  }
};

export default storeConfig;