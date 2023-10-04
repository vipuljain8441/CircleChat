import {createSlice} from "@reduxjs/toolkit"


const initialState = {
   post:{},
};

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        getPost(state,action){
            state.post = action.payload;
        },
    },
});

export default postSlice.reducer;

export function SetPost(post){
    return (dispatch,getState) => {
        dispatch(postSlice.actions.getPost(post));
    };
}