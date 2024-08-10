import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Draft,produce} from 'immer';
import { createBooking, deleteBooking, fetchBooking, fetchBookingDataById, updateBooking } from './actions';

interface BookingState {
    data: BookingData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  data: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooking.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<BookingData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchBooking.rejected, (state, action) => {
          state.error = action.error.message || 'Lấy dữ liệu thất bại';
          state.loading = false;
        })
        .addCase(updateBooking.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateBooking.fulfilled, (state, action: PayloadAction<BookingData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(updateBooking.rejected, (state, action) => {
          state.error = action.error.message || 'Cập nhật thông tin thất bại';
          state.loading = false;
        })
        .addCase(createBooking.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createBooking.fulfilled, (state, action: PayloadAction<BookingData>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createBooking.rejected, (state, action) => {
          state.error = action.error.message || 'Tạo mới thất bại';
          state.loading = false;
        })
        .addCase(deleteBooking.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteBooking.fulfilled, (state) => {
          state.data = null;
          state.loading = false;
        })
        .addCase(deleteBooking.rejected, (state, action) => {
          state.error = action.error.message || 'Xóa thất bại';
          state.loading = false;
        })
        .addCase(fetchBookingDataById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchBookingDataById.fulfilled, (state, action: PayloadAction<BookingData>) => {
        state.data = action.payload; // Assuming you only want the first image data
        state.loading = false;
      })
          .addCase(fetchBookingDataById.rejected, (state, action) => {
            state.error = action.error.message || 'Lấy dữ liệu thất bại';
            state.loading = false;
          })
    },
  });


// export const { createStaff,updateStaff,deleteStaff} = userSlice.actions;
export default bookingSlice.reducer;