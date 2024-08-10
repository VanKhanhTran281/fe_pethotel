import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Draft,produce} from 'immer';
import {  createComment, deleteComment, fetchComment, updateComment } from './actions';

interface CommentState {
    data: CommentData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  data: null,
  loading: false,
  error: null,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchComment.fulfilled, (state, action: PayloadAction<CommentData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchComment.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu thất bại';
          state.loading = false;
        })
        .addCase(updateComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateComment.fulfilled, (state, action: PayloadAction<CommentData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(updateComment.rejected, (state, action) => {
          state.error = action.error.message || 'Cập nhật thông tin thất bại';
          state.loading = false;
        })
        .addCase(createComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createComment.fulfilled, (state, action: PayloadAction<CommentData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createComment.rejected, (state, action) => {
          state.error = action.error.message || 'Tạo mới thất bại';
          state.loading = false;
        })
        .addCase(deleteComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteComment.fulfilled, (state) => {
          state.data = null;
          state.loading = false;
        })
        .addCase(deleteComment.rejected, (state, action) => {
          state.error = action.error.message || 'Xóa thất bại';
          state.loading = false;
        })
    },
  });


// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default commentSlice.reducer;