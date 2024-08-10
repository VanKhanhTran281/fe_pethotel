import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Draft,produce} from 'immer';
import { createImage, deleteImage, fetchImage, fetchImageDataByRoomId, updateImage } from './actions';

interface ImageState {
    data: ImageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  data: null,
  loading: false,
  error: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchImage.fulfilled, (state, action: PayloadAction<ImageData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchImage.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu ảnh thất bại';
          state.loading = false;
        })
        .addCase(updateImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateImage.fulfilled, (state, action: PayloadAction<ImageData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(updateImage.rejected, (state, action) => {
          state.error = action.error.message || 'Cập nhật thông tin ảnh thất bại';
          state.loading = false;
        })
        .addCase(createImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createImage.fulfilled, (state, action: PayloadAction<ImageData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createImage.rejected, (state, action) => {
          state.error = action.error.message || 'Tạo ảnh thất bại';
          state.loading = false;
        })
        .addCase(deleteImage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteImage.fulfilled, (state) => {
          state.data = null;
          state.loading = false;
        })
        .addCase(deleteImage.rejected, (state, action) => {
          state.error = action.error.message || 'Xóa ảnh thất bại';
          state.loading = false;
        })
        .addCase(fetchImageDataByRoomId.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchImageDataByRoomId.fulfilled, (state, action: PayloadAction<ImageData>) => {
        state.data = action.payload; // Assuming you only want the first image data
        state.loading = false;
      })
          .addCase(fetchImageDataByRoomId.rejected, (state, action) => {
            state.error = action.error.message || 'Lấy dữ liệu ảnh thất bại';
            state.loading = false;
          })
    },
  });


// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default imageSlice.reducer;