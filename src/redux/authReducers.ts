import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    currentUser: any;
  }
  
  const initialState: AuthState = {
    isLoggedIn: false,
    currentUser: null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.isLoggedIn = action.payload;
      },
      setCurrentUser: (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
      },
    },
  });

  export const { setIsLoggedIn, setCurrentUser } = authSlice.actions;
// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default authSlice.reducer;