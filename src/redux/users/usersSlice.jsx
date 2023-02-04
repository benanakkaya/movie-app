import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const usersAdapter = createEntityAdapter();

export const usersSelector = usersAdapter.getSelectors((state) => state.users);

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await axios("http://localhost:3002/users");
    return response.data;
})

export const setNewUser = createAsyncThunk("users/setUser", async (values) => {
    await axios.post("https://shy-cyan-angler-kit.cyclic.app/users", { username: values.username, password: values.password, email: values.email, admin: false, id: values.id, favorites: [] });
    const response = await axios("http://localhost:3002/users");
    return response.data;
})

export const getFavorites = createAsyncThunk("users/getFavorites", async (val) => {
    const res = await axios(`https://shy-cyan-angler-kit.cyclic.app/users/${val[0]}`);
    return res.data.favorites;
})

export const addFavorite = createAsyncThunk("users/setFavorites", async (val) => {
    const res = await axios(`https://shy-cyan-angler-kit.cyclic.app/users/${val[0]}`);
    await axios.patch(`https://shy-cyan-angler-kit.cyclic.app/users/${val[0]}`, {favorites : [...res.data.favorites,val[1]] });
    const response = await axios("https://shy-cyan-angler-kit.cyclic.app/users");
    return response.data;
})

export const removeFavoriteDB = createAsyncThunk("users/removeFavorite", async (val) => {
    const res = await axios(`https://shy-cyan-angler-kit.cyclic.app/users/${val[0]}`);
    const newFavorites = res.data.favorites.filter((name) => name !== val[1]);
    await axios.patch(`https://shy-cyan-angler-kit.cyclic.app/users/${val[0]}`, {favorites : newFavorites });
    const response = await axios("https://shy-cyan-angler-kit.cyclic.app/users");
    return response.data;
})




const usersSlice = createSlice({
    name: "users",
    initialState: usersAdapter.getInitialState({
        status: "idle",
        login: false,
        userFavorites: []
    }),
    reducers: {
        setLoginState: (state, action) => {
            state.login = action.payload;
            localStorage.setItem("login", JSON.stringify(state.login));
        },
        setUserFavorites: (state,action) => {
            state.userFavorites = [...state.userFavorites,action.payload];
            console.log(state.userFavorites);
        },
        removeFavorite : (state,action) => {
            state.userFavorites = state.userFavorites.filter((mov) => mov.name !== action.payload);
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = "ready";
            usersAdapter.addMany(state, action.payload);
            state.userList = action.payload;
        },
        [setNewUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [setNewUser.fulfilled]: (state, action) => {
            state.status = "ready";
            usersAdapter.addMany(state, action.payload);
            state.userList = action.payload;
        },
        [addFavorite.pending]: (state, action) => {
            state.status = "loading"
        },
        [addFavorite.fulfilled]: (state, action) => {
            state.status = "ready";
            usersAdapter.addMany(state, action.payload);
            state.userList = action.payload;
        },
        [getFavorites.pending] : (state,action) => {
            state.status = "loading"
        },
        [getFavorites.fulfilled] : (state,action) => {
            state.userFavorites = action.payload;
            state.status = "ready";
        },
        [removeFavoriteDB.pending] : (state,action) => {
            state.status = "loading"
        },
        [removeFavoriteDB.fulfilled] : (state,action) => {
            state.userFavorites = action.payload;
            state.status = "ready";
        }
    }
})


export default usersSlice.reducer;
export const { setLoginState,setUserFavorites,removeFavorite} = usersSlice.actions;