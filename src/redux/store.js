// Importation des dépendances Redux / Redux dependencies import
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import { thunk } from "redux-thunk";
import Reducer from './reducers/reducers';

// Configuration des outils de développement Redux / Redux DevTools configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Configuration du store Redux / Redux store configuration
 * 
 * Middleware utilisés / Used middleware:
 * - thunk: Pour les actions asynchrones / For asynchronous actions
 * 
 * Outils de développement / Development tools:
 * - Redux DevTools: Pour le débogage / For debugging
 */
const store = legacy_createStore(
  Reducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Écouteur pour les changements d'état / State change listener
store.subscribe(() => {
  // Log des changements d'état en développement / Log state changes in development
  if (process.env.NODE_ENV === 'development') {
    console.log('État mis à jour:', store.getState());
  }
});

export default store;

