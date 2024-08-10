import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRoom } from './actions';
import { Draft,produce} from 'immer';

interface RoomState {
  data: RoomData | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  data: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<RoomData>) => {
      const updatedRoomData = action.payload;
      
      if (Array.isArray(state.data)) {
        const existingRoom = state.data.find(room => room.roomId === updatedRoomData.roomId);
        if (existingRoom) {
          Object.assign(existingRoom, updatedRoomData);
        }
      }
    },
    createRoom: (state, action: PayloadAction<RoomData>) => {
      const newRoomData = action.payload;
      
      if (state.data) {
        const dataArray = state.data as unknown as RoomData[];
        dataArray.push(newRoomData);
      }
    },
    deleteRoom: (state: Draft<RoomState>, action: PayloadAction<number>) => {
      const roomId = action.payload;
      state.data = produce(state.data, (draft: Draft<RoomData>[]) => {
        if (Array.isArray(draft)) {
          draft = draft.filter(room => room.roomId !== roomId);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoom.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(fetchRoom.fulfilled, (state, action: PayloadAction<RoomData>) => {
      state.loading = false;
      state.data = action.payload;
    });
    
    builder.addCase(fetchRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch room data.';
    });
  },
});


export const { updateRoom,createRoom,deleteRoom} = roomSlice.actions;
export default roomSlice.reducer;