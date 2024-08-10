// import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
// import userReducer from './reducers';
// import { useDispatch } from 'react-redux';

// const middleware = getDefaultMiddleware({
//   thunk: true,
//   serializableCheck: false,
// });

// const store = configureStore({
//   reducer: {
//     user: userReducer,
    
//   },
//   middleware,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './reducers';
import { useDispatch } from 'react-redux';
import staffReducers from './staffReducers';
import serviceReducers from './serviceReducers';
import userReducers from './userReducers';
import imageReducers from './imageReducers';
import authReducers from './authReducers';
import bookingReducers from './bookingReducers';
import commentReducers from './commentReducers';
import detailReducers from './detailReducers';

const store = configureStore({
  reducer: {
    room: roomReducer,
    staff:staffReducers,
    service: serviceReducers,
    user: userReducers,
    image:imageReducers,
    auth: authReducers,
    booking: bookingReducers,
    comment:commentReducers,
    detail:detailReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;