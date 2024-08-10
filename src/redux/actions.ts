import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoomData,createRoomData,patchRoomData,deleteRoomData, fetchStaffData, patchStaffData, createStaffData, deleteStaffData, fetchServiceData, patchServiceData, createServiceData, deleteServiceData, fetchUserData, patchUserData, createUserData, deleteUserData, fetchUserProfile, login, fetchImageData, patchImageData, createImageData, deleteImageData, fetchImageByRoomId, fetchBookingData, fetchBookingById, patchBookingData, createBookingData, deleteBookingData, fetchUserById, fetchCommentData, patchCommentData, createCommentData, deleteCommentData, fetchDetailData, patchDetailData, createDetailData, deleteDetailData, fetchStaffById, fetchDetailById } from './api';

// room
export const fetchRoom = createAsyncThunk<RoomData, void>('room/fetchRoom', async () => {
  const roomData = await fetchRoomData();
  return roomData;
});
export const updateRoom = createAsyncThunk<RoomData, Partial<RoomData>>(
  'room/updateRoom',
  async (roomData) => {
    const updatedRoomData = await patchRoomData(roomData);
    return updatedRoomData;
  }
);
export const createRoom = createAsyncThunk<RoomData, FormData>(
  'room/createRoom',
  async (roomData) => {
    const createdRoomData = await createRoomData(roomData);
    return createdRoomData;
  }
);
export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async (roomId: number) => {
    const deleteRoom = await deleteRoomData(roomId);
    return deleteRoom;
  });

// user

export const loginUser = createAsyncThunk<
  { user: UserData; access_token: string },
  UserLogin
>('user/loginUser', async (userLogin) => {
  const { user, access_token } = await login(userLogin);
  return { user, access_token };
});
export const fetchUserProfiles = createAsyncThunk<UserData, void>(
  'user/fetchUserProfile',
  async () => {
    const userData = await fetchUserProfile();
    return userData;
  }
);
export const fetchUserDataById = createAsyncThunk<UserDataById, number>(
  'user/fetchUserDataById',
  async (userId) => {
    try {
      const bookings = await fetchUserById(userId);
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  });
export const fetchUser = createAsyncThunk<UserData, void>('user/fetchUser', async () => {
  const userData = await fetchUserData();
  return userData;
});
export const updateUser = createAsyncThunk<UserData, Partial<UserData>>(
  'user/updateUser',
  async (userData) => {
    const updatedUserData = await patchUserData(userData);
    return updatedUserData;
  }
);
export const createUser = createAsyncThunk<UserData, UserAddData>(
  'user/createUser',
  async (userData) => {
    const createdUserData = await createUserData(userData);
    return createdUserData;
  }
);
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: number) => {
    const deleteUser = await deleteUserData(userId);
    return deleteUser;
  });

// staff
export const fetchStaff = createAsyncThunk<StaffData, void>('staff/fetchStaff', async () => {
  const staffData = await fetchStaffData();
  return staffData;
});

export const fetchStaffDataByStaffId = createAsyncThunk<StaffData, number>(
  'staff/fetchStaffDataByRoomId',
  async (staffId) => {
    try {
      const images = await fetchStaffById(staffId);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  });
export const updateStaff = createAsyncThunk<StaffData, Partial<StaffData>>(
  'staff/updateStaff',
  async (staffData) => {
    const updatedStaffData = await patchStaffData(staffData);
    return updatedStaffData;
  }
);
export const createStaff = createAsyncThunk<StaffData, StaffAddData>(
  'staff/createStaff',
  async (staffData) => {
    const createdStaffData = await createStaffData(staffData);
    return createdStaffData;
  }
);
export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (staffId: number) => {
    const deleteStaff = await deleteStaffData(staffId);
    return deleteStaff;
  });
// booking
export const fetchBooking = createAsyncThunk<BookingData, void>('booking/fetchBooking', async () => {
  const bookingData = await fetchBookingData();
  return bookingData;
});
export const fetchBookingDataById = createAsyncThunk<BookingData, number>(
  'booking/fetchBookingDataById',
  async (bookingId) => {
    try {
      const bookings = await fetchBookingById(bookingId);
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  });
export const updateBooking = createAsyncThunk<BookingData, Partial<BookingData>>(
  'booking/updateBooking',
  async (bookingData) => {
    const updatedBookingData = await patchBookingData(bookingData);
    return updatedBookingData;
  }
);
export const createBooking = createAsyncThunk<BookingData, BookingAddData>(
  'booking/createBooking',
  async (bookingData) => {
    const createdBookingData = await createBookingData(bookingData);
    return createdBookingData;
  }
);
export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async (bookingId: number) => {
    const deleteBooking = await deleteBookingData(bookingId);
    return deleteBooking;
  });



// comment
export const fetchComment = createAsyncThunk<CommentData, void>('comment/fetchComment', async () => {
  const commentData = await fetchCommentData();
  return commentData;
});
export const updateComment = createAsyncThunk<CommentData, Partial<CommentData>>(
  'comment/updateComment',
  async (commentData) => {
    const updatedCommentData = await patchCommentData(commentData);
    return updatedCommentData;
  }
);
export const createComment = createAsyncThunk<CommentData, CommentAddData>(
  'comment/createComment',
  async (commentData) => {
    const createdCommentData = await createCommentData(commentData);
    return createdCommentData;
  }
);
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId: number) => {
    const deleteComment = await deleteCommentData(commentId);
    return deleteComment;
  });

// detail
export const fetchDetail = createAsyncThunk<DetailData, void>('detail_booking/fetchDetail', async () => {
  const DetailData = await fetchDetailData();
  return DetailData;
});

export const fetchDetailDataByDetailId = createAsyncThunk<DetailData, number>(
  'detail_booking/fetchDetailDataByDetailId',
  async (detailId) => {
    try {
      const details = await fetchDetailById(detailId);
      return details;
    } catch (error) {
      console.error('Error fetching details:', error);
      throw error;
    }
  });
export const updateDetail = createAsyncThunk<DetailData, Partial<DetailData>>(
  'detail_booking/updateDetail',
  async (detailData) => {
    const updatedDetailData = await patchDetailData(detailData);
    return updatedDetailData;
  }
);
export const createDetail = createAsyncThunk<DetailData, DetailAddData>(
  'detail_booking/createDetail',
  async (detailData) => {
    const createdDetailData = await createDetailData(detailData);
    return createdDetailData;
  }
);
export const deleteDetail = createAsyncThunk(
  'detail_booking/deleteDetail',
  async (detailId: number) => {
    const deleteDetail = await deleteDetailData(detailId);
    return deleteDetail;
  });

// images
export const fetchImage = createAsyncThunk<ImageData, void>('image/fetchImage', async () => {
  const imageData = await fetchImageData();
  return imageData;
});

export const fetchImageDataByRoomId = createAsyncThunk<ImageData, number>(
  'image/fetchImagesByRoomId',
  async (roomId) => {
    try {
      const images = await fetchImageByRoomId(roomId);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  });
export const updateImage = createAsyncThunk<ImageData, Partial<ImageData>>(
  'image/updateImage',
  async (imageData) => {
    const updatedImageData = await patchImageData(imageData);
    return updatedImageData;
  }
);
export const createImage = createAsyncThunk<ImageData, FormData>(
  'image/createImage',
  async (imageData) => {
    const createdImageData = await createImageData(imageData);
    return createdImageData;
  }
);
export const deleteImage = createAsyncThunk(
  'image/deleteImage',
  async (imgId: number) => {
    const deleteImage = await deleteImageData(imgId);
    return deleteImage;
  });



// service
export const fetchService = createAsyncThunk<ServiceData, void>('service/fetchService', async () => {
  const serviceData = await fetchServiceData();
  return serviceData;
});
export const updateService = createAsyncThunk<ServiceData, Partial<ServiceData>>(
  'service/updateService',
  async (serviceData) => {
    const updatedServceData = await patchServiceData(serviceData);
    return updatedServceData;
  }
);
export const createService = createAsyncThunk<ServiceData, ServiceAddData>(
  'service/createService',
  async (serviceData) => {
    const createdServiceData = await createServiceData(serviceData);
    return createdServiceData;
  }
);
export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (serviceId: number) => {
    const deleteService = await deleteServiceData(serviceId);
    return deleteService;
  });
// payments