import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// this is used to store the global state into browsers local memory

// to persist reducer we need to combine them using below method then we will use persist reducer function to persist the global state in the browser lcoal storage. so that whenever browser is refreshed, state will still be persisted

const rootReducer = combineReducers({user: userReducer});

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // reducer : {user: userReducer},
    //this is added to prevent errors in browser, research more about it.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store)