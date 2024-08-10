import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Cat from "./pages/cat";
import Dog from "./pages/dog";
import Service from "./pages/service";
import RoomPhoto from "./pages/room_photo";
import SignUp from "./components/account/sign_up";
import DetailProduct from "./pages/detail/detail_product";
import AdminLayout from "./admin/component_admin/AdminLayout";
import UserAdmin from "./admin/page/user";
import RoomAdmin from "./admin/page/room";
import SignIn from "./components/account/sign_in";
import StaffAdmin from "./admin/page/staff";
import ServiceAdmin from "./admin/page/service";
import ImageAdmin from "./admin/page/image";
import BookingAdmin from "./admin/page/booking";
import DetailAdmin from "./admin/page/detail_booking";
import DetailStaff from "./admin/page/staff/DetailStaff";
import Details from "./admin/page/detail_booking/Detail";
import CommentAdmin from "./admin/page/comment";
import SeeStaff from "./admin/page/staff/SendStaff";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dog />,
        },
        {
          path: "/cat",
          element: <Cat />,
        },
        {
          path: "/service",
          element: <Service />,
        },
        {
          path: "/room_photo",
          element: <RoomPhoto/>,
        },
        {
          path: "/signup",
          element: <SignUp/>,
        },
        {
          path: "/signin",
          element: <SignIn/>,
        },
        {
          path: "/detail_product",
          element: <DetailProduct/>,
        },
        
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout/>,
      children: [
        {
          index: true,
          path: "user",
          element: <UserAdmin />,
        },
        {
          path: "room",
          element: <RoomAdmin/>,
        },
        {
          path: "staff",
          element: <StaffAdmin/>,
        },
        {
          path: "seestaff",
          element: <SeeStaff/>,
        },
        {
          path: "service",
          element: <ServiceAdmin/>,
        },
        {
          path: "image",
          element: <ImageAdmin/>,
        },
        {
          path: "booking",
          element: <BookingAdmin/>,
        },
        {
          path: "detail",
          element: <DetailAdmin/>,
        },
        {
          path: "staff/:staffId",
          element: <DetailStaff/>,
        },
        {
          path: "detail/:detailId",
          element: <Details/>,
        },
        {
          path: "comment",
          element: <CommentAdmin/>,
        },
      ],
    },
    {
      path: "/staff",
      // element: <AdminLayout/>,
      children: [
        {
          index: true,
          path: "seestaff",
          element: <SeeStaff/>,
        },
        {
          path: "seestaff/:staffId",
          element: <DetailStaff/>,
        },
      ],
    },
  ]);