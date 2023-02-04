import {createSlice,createAsyncThunk,createEntityAdapter, getDefaultMiddleware, nanoid} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchMovies = createAsyncThunk("movies/getMovies", async () => {
    const response = await axios(`https://shy-cyan-angler-kit.cyclic.app/movies`);
    return response.data;
})

export const movieUpdateForViews = createAsyncThunk("movies/setMovies", async (mov) => {
    await axios.patch(`https://shy-cyan-angler-kit.cyclic.app/movies/${mov.id}`, {views: mov.views+1})
})

export const setNewComment = createAsyncThunk("movies/setNewComment", async  (val) => {
    const newComments = [...val[1],val[2]];
    await axios.patch(`https://shy-cyan-angler-kit.cyclic.app/movies/${val[0]}`, {comments: newComments})
})

export const moviesAdapter = createEntityAdapter();
export const moviesSelector = moviesAdapter.getSelectors((state) => state.movies);

//for serializableCheck
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })



const moviesSlice = createSlice({
    name:"movies",
    initialState: moviesAdapter.getInitialState({
        status: "idle",
        sortSetting: "id",
        filteredList : [],
        selectedCategory: "",
        movieComments: [],
        targetMovie: []
    }),
    reducers:{
        updateList : moviesAdapter.updateOne,
        setSortSetting : (state,action) => {
            state.sortSetting = action.payload;
        },
        setSelectedCategory : (state,action) => {
            state.selectedCategory = action.payload;
        },
        getMovieComments : (state,action) => {     
            if(action.payload[0] !== undefined ) {
                state.movieComments = action.payload[0].comments;
            }
        },
        setMovieComment : (state,action) => {
            state.movieComments = [...state.movieComments,action.payload]
        }
    },
    extraReducers:{
        [fetchMovies.pending]: (state,action) => {
            state.status = "loading";
        },
        [fetchMovies.fulfilled] : (state,action) => {
            state.status = "ready";
            moviesAdapter.addMany(state, action.payload);
            state.filteredList =action.payload;   
        }
    }
})

export const {updateList,setSortSetting,setSelectedCategory,getMovieComments,setMovieComment} = moviesSlice.actions;
export default moviesSlice.reducer;