import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movies/moviesSlice';
import modalsSlice from './modals/modalsSlice';
import usersSlice from './users/usersSlice';


const store = configureStore({
    reducer:{
        movies: moviesSlice,
        modals: modalsSlice,
        users: usersSlice
    }
})


export default store;