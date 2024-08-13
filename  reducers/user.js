import { createSlice } from '@reduxjs/toolkit';  
  
const initialState = {  
    value: {
        username: null, 
        token: null,
        vehicle: [],
        photos: [],
        pic: [],
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
        addVehicle: (state, action) => {  
            state.value.push(action.payload); 
    },
        addPhoto: (state, action) => {  
        state.value.photos.push(action.payload);
        console.log(action.payload);
         
    },  
        addPic: (state, action) => {  
        state.value.pics.push(action.payload);
        console.log(action.payload);
    },
}
  
});  
  
export const { addUsername, addVehicle, addPhoto , addPic} = userSlice.actions;
export default userSlice.reducer;