import {createSlice} from "@reduxjs/toolkit";



const modalsSlice = createSlice({
    name:"modals",
    initialState:{
        modalState:false,
        formState:"register",
    },
    reducers:{
        setModalState: (state,action) => {
            state.modalState = action.payload;
        },
        setFormState: (state, action) => {
            state.formState = action.payload;
        }
    }
})

export default modalsSlice.reducer;
export const {setModalState,setFormState} = modalsSlice.actions;