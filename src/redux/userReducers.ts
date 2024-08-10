import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Draft,produce} from 'immer';
import { createUser, deleteUser, fetchUser, fetchUserDataById, fetchUserProfiles, loginUser, updateUser } from './actions';

interface UserState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: UserData; access_token: string }>) => {
          state.data = action.payload.user;
          state.loading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error.message || 'Đăng nhập thất bại';
          state.loading = false;
        })
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu người dùng thất bại';
          state.loading = false;
        })
        .addCase(updateUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.error = action.error.message || 'Cập nhật thông tin người dùng thất bại';
          state.loading = false;
        })
        .addCase(createUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action: PayloadAction<UserData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.error = action.error.message || 'Tạo người dùng thất bại';
          state.loading = false;
        })
        .addCase(deleteUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state) => {
          state.data = null;
          state.loading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.error = action.error.message || 'Xóa người dùng thất bại';
          state.loading = false;
        })
        .addCase(fetchUserProfiles.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserProfiles.fulfilled, (state, action: PayloadAction<UserData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchUserProfiles.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy thông tin hồ sơ người dùng thất bại';
          state.loading = false;
        })
    //     .addCase(fetchUserDataById.pending, (state) => {
    //       state.loading = true;
    //       state.error = null;
    //     })
    //   .addCase(fetchUserDataById.fulfilled, (state, action: PayloadAction<UserDataById>) => {
    //     state.data = action.payload; // Assuming you only want the first image data
    //     state.loading = false;
    // })
    //     .addCase(fetchUserDataById.rejected, (state, action) => {
    //       state.error = action.error.message || 'Lấy dữ liệu ảnh thất bại';
    //       state.loading = false;
    //     })
    },
  });


// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default userSlice.reducer;