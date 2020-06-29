/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { ENABLE_REDUX_LOGGER } from '../config';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web

const loggerMiddleware = createLogger();

export function configureStore(preloadedState = {}) {
  
  // redex-thunk
  const middlewares = [thunkMiddleware]; 
  
  // redux-logger
  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware); 
  }

  // redux-devtools-extension
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  // redux-persist
  const persistConfig = {
      key: 'root',
      storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  const persistor = persistStore(store);
// const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return { store, persistor };
}
