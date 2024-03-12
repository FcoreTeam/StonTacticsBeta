import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: !!Cookies.get("accessToken"),
    name: null,
    email: null,
    avatarUrl: null
  },
  reducers: {
    setUserSign: (state, action) => {
      state.isSignedIn = action.payload
    },
    setUserData: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatarUrl = action.payload.avatarUrl
    },
  },
});

export const { setUserSign, setUserData } = userSlice.actions;
export default userSlice.reducer;