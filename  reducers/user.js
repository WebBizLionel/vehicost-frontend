import { createSlice } from '@reduxjs/toolkit';  
  
const initialState = {  
    value: {
        username: null, 
        token: null,
    },
};

export const userSlice = createSlice({  
    name: 'user',
    initialState,  
    reducers: {  
        addUsername: (state, action) => {  
            state.value.username = action.payload.username;
            state.value.token = action.payload.token;
    },  

    },  
  
});  
  
export const { addUsername } = userSlice.actions;
export default userSlice.reducer;