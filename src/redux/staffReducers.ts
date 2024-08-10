import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft,produce} from 'immer';
import {  fetchStaff, fetchStaffDataByStaffId } from './actions';

interface RoomState {
  data: StaffData | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  data: null,
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    updateStaff: (state, action: PayloadAction<StaffData>) => {
      const updatedStaffData = action.payload;
      
      if (Array.isArray(state.data)) {
        const existingStaff = state.data.find(staff => staff.staffId === updatedStaffData.staffId);
        if (existingStaff) {
          Object.assign(existingStaff, updatedStaffData);
        }
      }
    },
    createStaff: (state, action: PayloadAction<StaffData>) => {
      const newStaffData = action.payload;
      
      if (state.data) {
        const dataArray = state.data as unknown as StaffData[];
        dataArray.push(newStaffData);
      }
    },
    deleteStaff: (state: Draft<RoomState>, action: PayloadAction<number>) => {
      const staffId = action.payload;
      state.data = produce(state.data, (draft: Draft<StaffData>[]) => {
        if (Array.isArray(draft)) {
          draft = draft.filter(staff => staff.staffId !== staffId);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(fetchStaff.fulfilled, (state, action: PayloadAction<StaffData>) => {
      state.loading = false;
      state.data = action.payload;
    });
    
    builder.addCase(fetchStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch staff data.';
    });
    builder.addCase(fetchStaffDataByStaffId.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchStaffDataByStaffId.fulfilled, (state, action: PayloadAction<StaffData>) => {
  state.data = action.payload; // Assuming you only want the first image data
  state.loading = false;
})
builder.addCase(fetchStaffDataByStaffId.rejected, (state, action) => {
      state.error = action.error.message || 'Lấy dữ liệu thất bại';
      state.loading = false;
    })
  },
});


export const { createStaff,updateStaff,deleteStaff} = staffSlice.actions;
export default staffSlice.reducer;