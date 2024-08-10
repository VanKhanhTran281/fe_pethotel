import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createDetail, createImage, deleteDetail, deleteImage, fetchDetail, fetchDetailDataByDetailId, fetchImage, fetchImageDataByRoomId, updateDetail, updateImage } from './actions';

interface DetailState {
    data: DetailData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  data: null,
  loading: false,
  error: null,
};

const detailSlice = createSlice({
    name: 'detail_booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDetail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDetail.fulfilled, (state, action: PayloadAction<DetailData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchDetail.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu ảnh thất bại';
          state.loading = false;
        })
        .addCase(updateDetail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateDetail.fulfilled, (state, action: PayloadAction<DetailData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(updateDetail.rejected, (state, action) => {
          state.error = action.error.message || 'Cập nhật thông tin thất bại';
          state.loading = false;
        })
        .addCase(createDetail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createDetail.fulfilled, (state, action: PayloadAction<DetailData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createDetail.rejected, (state, action) => {
          state.error = action.error.message || 'Tạo thất bại';
          state.loading = false;
        })
        .addCase(deleteDetail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteDetail.fulfilled, (state) => {
          state.data = null;
          state.loading = false;
        })
        .addCase(deleteDetail.rejected, (state, action) => {
          state.error = action.error.message || 'Xóa thất bại';
          state.loading = false;
        })
        .addCase(fetchDetailDataByDetailId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(fetchDetailDataByDetailId.fulfilled, (state, action: PayloadAction<DetailData>) => {
      state.data = action.payload; // Assuming you only want the first image data
      state.loading = false;
    })
        .addCase(fetchDetailDataByDetailId.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu ảnh thất bại';
          state.loading = false;
        })
    },
  });


// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default detailSlice.reducer;