// interface ContactsData {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   date_added: string;
//   last_updated: string;
// }
//   interface ContactsAddData {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   }

interface RoomData {
  roomId: number;
  roomNumber: string;
  roomType: string;
  size: string;
  describe: string;
  img: string;
  price: number;
  discount: number;
  condition: string;
}
interface RoomAddData {
  roomNumber: string;
  roomType: string;
  size: string;
  describe: string;
  img: string;
  price: number;
  discount: number;
  condition: string;
}

// user
interface UserData {
  userId: number;
  userName: string;
  password: string;
  email: string;
  sex: string;
  address: string;
  lastUpdate: Date;
  dateAdd: Date;
  role:string
}
interface UserDataById {
  userId: number;
  userName: string;
  email: string;
  sex: string;
  address: string;
  comment: {
    commentId: number;
    content: number;
    
  };
  booking: {
    bookingId: number;
    room: {
      roomId: number;
      roomNumber: string;
      roomType: string;
      size: string;
      describe: string;
      img: string;
      price: number;
      discount: number;
      condition: string;
    }
  };
}
interface UserAddData {
  userName: string;
  password: string;
  email: string;
  sex: string;
  address: string;
}
interface UserLogin {
  email: string;
  password: string;
}
// staff
interface StaffData {
  staffId: number;
  staffName: string;
  sex: string;
  address: string;
  phoneNumber: string;
  detailBooking:{
    detailId: number;
    roomNumber: string;
    roomType: string;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
    service:{
      serviceId: number;
      nameService: string;
      price: number;
      describe: string;
    }
  }

}
interface StaffAddData {
  staffName: string;
  sex: string;
  address: string;
  phoneNumber: string;
}
// booking
interface BookingAddData {

  startDate: Date;
  endDate: Date;
  roomId: number;
}
interface BookingData {
  bookingId: number;
  startDate: Date;
  endDate: Date;
  user: {
    userId: number;
    userName: string;
    password: string;
    email: string;
    sex: string;
    address: string;
    lastUpdate: Date;
    dateAdd: Date;
  };
  room: {
    roomId: number;
    roomNumber: string;
    roomType: string;
    size: string;
    describe: string;
    img: string;
    price: number;
    discount: number;
    condition: string;
  };
}
// comment
interface CommentData {
  commentId: number;
  content: string;
    userId:number
}
interface CommentAddData {
  content: string;
}
// detail
interface DetailData {
  detailId: number;
    roomNumber: string;
    roomType: string;
    totalPrice: number;
    startDate: Date|null;
    endDate: Date;
    bookingId:number;
    staff?:{
      staffId: number|undefined;
      staffName: string|undefined;
      sex: string|undefined;
      address: string|undefined;
      phoneNumber: string|undefined;
    }|undefined;
    service?:{
      serviceId: number|undefined;
      nameService: string|undefined;
      price: number|undefined;
      describe: string|undefined;
    }|undefined

}
interface DetailAddData {
  roomNumber: string|undefined ;
    roomType: string|undefined;
    totalPrice: number |null;
    startDate: Date|null;
    endDate: Date |null;
    bookingId:number|undefined;
    // staffId:number|null;
    serviceId:number|undefined;
}


// images
interface ImageData {
  imgId: number;
  date: Date;
  imgUrl: string;
  room: {
    roomId: number;
    roomNumber: string;
    roomType: string;
    size: string;
    describe: string;
    img: string;
    price: number;
    discount: number;
    condition: string;
  };
}
interface ImageAddData {
  date: Date;
  imgUrl?: string;
  roomId: number
}
// service
interface ServiceData {
  serviceId: number;
  nameService: string;
  price: number;
  describe: string;
}
interface ServiceAddData {
  nameService: string;
  price: number;
  describe: string;
}
// payments