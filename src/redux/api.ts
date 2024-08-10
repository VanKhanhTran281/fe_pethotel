import axios from 'axios';

// room
export const patchRoomData = async (roomData: Partial<RoomData>): Promise<RoomData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { roomId, ...updatedFields } = roomData;
  const response = await axios.patch<RoomData>(`http://localhost:3000/room/${roomId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createRoomData =  async (formData: FormData): Promise<RoomData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<RoomData>('http://localhost:3000/room', formData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteRoomData = async (roomId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/room/${roomId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};
export const fetchRoomData = async (): Promise<RoomData> => {
  const response = await axios.get<RoomData>('http://localhost:3000/room');
  return response.data;
};
// export const patchRoomData = async (roomData: Partial<RoomData>): Promise<RoomData> => {
//   const { roomId, ...updatedFields } = roomData;
//   const response = await axios.patch<RoomData>(`http://localhost:3000/room/${roomId}`, updatedFields);
//   return response.data;
// };
// export const createRoomData = async (roomData: RoomAddData): Promise<RoomData> => {
//   const response = await axios.post<RoomData>('http://localhost:3000/room', roomData);
//   return response.data;
// };
// export const deleteRoomData = async (roomId: number): Promise<void> => {
//   await axios.delete(`http://localhost:3000/room/${roomId}`);
// };


// user

export interface LoginResponse {
  user: UserData;
  access_token: string;
}

export const login = async (userLogin: UserLogin): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:3000/auth_user/login', userLogin);
  const { user, access_token } = response.data;
  localStorage.setItem('authToken', access_token);
  return { user, access_token };
};

export const fetchUserProfile = async (): Promise<UserData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<UserData>('http://localhost:3000/auth_user/profile', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchUserById = async (userId: number): Promise<UserDataById> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await axios.get<UserDataById>(`http://localhost:3000/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const fetchUserData = async (): Promise<UserData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<UserData>('http://localhost:3000/user', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const patchUserData = async (userData: Partial<UserData>): Promise<UserData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { userId, ...updatedFields } = userData;
  const response = await axios.patch<UserData>(`http://localhost:3000/user/${userId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createUserData = async (userData: UserAddData): Promise<UserData> => {
  const response = await axios.post<UserData>('http://localhost:3000/user', userData);
  return response.data;
};

export const deleteUserData = async (userId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};



// staff
export const fetchStaffData = async (): Promise<StaffData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<StaffData>('http://localhost:3000/staff', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};
// export const fetchStaffData = async (): Promise<StaffData> => {
//   const response = await axios.get<StaffData>('http://localhost:3000/staff');
//   return response.data;
// };
export const fetchStaffById = async (staffId: number): Promise<StaffData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await axios.get<StaffData>(`http://localhost:3000/staff/${staffId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};


export const patchStaffData = async (staffData: Partial<StaffData>): Promise<StaffData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { staffId, ...updatedFields } = staffData;
  const response = await axios.patch<StaffData>(`http://localhost:3000/staff/${staffId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};


// export const patchStaffData = async (staffData: Partial<StaffData>): Promise<StaffData> => {
//   const { staffId, ...updatedFields } = staffData;
//   const response = await axios.patch<StaffData>(`http://localhost:3000/staff/${staffId}`, updatedFields);
//   return response.data;
// };



export const createStaffData = async (staffData: StaffAddData): Promise<StaffData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<StaffData>('http://localhost:3000/staff', staffData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};


// export const createStaffData = async (staffData: StaffAddData): Promise<StaffData> => {
//   const response = await axios.post<StaffData>('http://localhost:3000/staff', staffData);
//   return response.data;
// };

export const deleteStaffData = async (staffId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/staff/${staffId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};

// export const deleteStaffData = async (staffId: number): Promise<void> => {
//   await axios.delete(`http://localhost:3000/staff/${staffId}`);
// };



// booking
export const fetchBookingData = async (): Promise<BookingData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<BookingData>('http://localhost:3000/booking', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const fetchBookingById = async (bookingId: number): Promise<BookingData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await axios.get<BookingData>(`http://localhost:3000/booking/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const patchBookingData = async (bookingData: Partial<BookingData>): Promise<BookingData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { bookingId, ...updatedFields } = bookingData;
  const response = await axios.patch<BookingData>(`http://localhost:3000/booking/${bookingId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createBookingData = async (bookingData: BookingAddData): Promise<BookingData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<BookingData>('http://localhost:3000/booking', bookingData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteBookingData = async (bookingId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/booking/${bookingId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};



// comment
export const fetchCommentData = async (): Promise<CommentData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<CommentData>('http://localhost:3000/comment', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

// export const fetchBookingById = async (bookingId: number): Promise<BookingData> => {
//   const authToken = localStorage.getItem('authToken');
//   if (!authToken) {
//     throw new Error('No access token found. Please log in first.');
//   }

//   try {
//     const response = await axios.get<BookingData>(`http://localhost:3000/booking/${bookingId}`, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     throw error;
//   }
// };

export const patchCommentData = async (commentData: Partial<CommentData>): Promise<CommentData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { commentId, ...updatedFields } = commentData;
  const response = await axios.patch<CommentData>(`http://localhost:3000/comment/${commentId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createCommentData = async (commentData: CommentAddData): Promise<CommentData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<CommentData>('http://localhost:3000/comment', commentData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteCommentData = async (commentId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/comment/${commentId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};
// detail
export const fetchDetailData = async (): Promise<DetailData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<DetailData>('http://localhost:3000/detail_booking', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};
export const fetchDetailById = async (detailId: number): Promise<DetailData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await axios.get<DetailData>(`http://localhost:3000/detail_booking/${detailId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const patchDetailData = async (detailData: Partial<DetailData>): Promise<DetailData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { detailId, ...updatedFields } = detailData;
  const response = await axios.patch<DetailData>(`http://localhost:3000/detail_booking/${detailId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createDetailData = async (detailData: DetailAddData): Promise<DetailData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<DetailData>('http://localhost:3000/detail_booking', detailData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteDetailData = async (detailId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/detail_booking/${detailId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};


// images
export const fetchImageData = async (): Promise<ImageData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.get<ImageData>('http://localhost:3000/image', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};
export const fetchImageByRoomId = async (roomId: number): Promise<ImageData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await axios.get<ImageData>(`http://localhost:3000/image/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const patchImageData = async (imageData: Partial<ImageData>): Promise<ImageData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { imgId, ...updatedFields } = imageData;
  const response = await axios.patch<ImageData>(`http://localhost:3000/image/${imgId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const createImageData = async (formData: FormData): Promise<ImageData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const response = await axios.post<ImageData>('http://localhost:3000/image', formData, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteImageData = async (imgId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/image/${imgId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};
// service
export const fetchServiceData = async (): Promise<ServiceData> => {
  const response = await axios.get<ServiceData>('http://localhost:3000/service');
  return response.data;
};
// export const patchServiceData = async (serviceData: Partial<ServiceData>): Promise<ServiceData> => {
//   const { serviceId, ...updatedFields } = serviceData;
//   const response = await axios.patch<ServiceData>(`http://localhost:3000/service/${serviceId}`, updatedFields);
//   return response.data;
// };
export const patchServiceData = async (serviceData: Partial<ServiceData>): Promise<ServiceData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  const { serviceId, ...updatedFields } = serviceData;
  const response = await axios.patch<ServiceData>(`http://localhost:3000/service/${serviceId}`, updatedFields, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};



export const createServiceData = async (serviceData: ServiceAddData): Promise<ServiceData> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }
  const response = await axios.post<ServiceData>('http://localhost:3000/service', serviceData,{
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.data;
};
// export const createServiceData = async (serviceData: ServiceAddData): Promise<ServiceData> => {
//   const response = await axios.post<ServiceData>('http://localhost:3000/service', serviceData);
//   return response.data;
// };

export const deleteServiceData = async (serviceId: number): Promise<void> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No access token found. Please log in first.');
  }

  await axios.delete(`http://localhost:3000/service/${serviceId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
};



// export const deleteServiceData = async (serviceId: number): Promise<void> => {
//   await axios.delete(`http://localhost:3000/service/${serviceId}`);}
// payments