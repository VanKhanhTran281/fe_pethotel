import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft,produce} from 'immer';
import { fetchService } from './actions';

interface RoomState {
  data: ServiceData | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  data: null,
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service ',
  initialState,
  reducers: {
    updateService: (state, action: PayloadAction<ServiceData>) => {
      const updatedServiceData = action.payload;
      
      if (Array.isArray(state.data)) {
        const existingService = state.data.find(service => service.serviceId === updatedServiceData.serviceId);
        if (existingService) {
          Object.assign(existingService, updatedServiceData);
        }
      }
    },
    createService: (state, action: PayloadAction<ServiceData>) => {
      const newServiceData = action.payload;
      
      if (state.data) {
        const dataArray = state.data as unknown as ServiceData[];
        dataArray.push(newServiceData);
      }
    },
    deleteService: (state: Draft<RoomState>, action: PayloadAction<number>) => {
      const serviceId = action.payload;
      state.data = produce(state.data, (draft: Draft<ServiceData>[]) => {
        if (Array.isArray(draft)) {
          draft = draft.filter(service => service.serviceId !== serviceId);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(fetchService.fulfilled, (state, action: PayloadAction<ServiceData>) => {
      state.loading = false;
      state.data = action.payload;
    });
    
    builder.addCase(fetchService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch service data.';
    });
  },
});


export const { createService,updateService,deleteService} = serviceSlice.actions;
export default serviceSlice.reducer;