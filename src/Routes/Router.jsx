import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyProfile from "../Dashbord/MyProfile/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashHome from "../Dashbord/DashHome/DashHome";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../Dashbord/UpdateProfile/UpdateProfile";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import MyOrders from "../Dashbord/MyOrders/MyOrders";
import Payment from "../Dashbord/Payment/Payment";
import PaymentSuccess from "../Dashbord/Payment/PaymentSuccess";
import PaymentCancelled from "../Dashbord/Payment/PaymentCancelled";
import PaymentHistory from "../Dashbord/Payment/PaymentHistory";
import AllUsers from "../Dashbord/AllUsers/AllUsers";
import ManageBooks from "../Dashbord/ManageBooks/ManageBooks";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component: Home
            },
            {
                path:'/allbooks',
                Component: AllBooks
            },
            {
                path:'/book-details/:id',
                element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>
            }
        ]
    },
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/register',
        Component: Register
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                index:true,
                Component:DashHome
            },
            {
                path:'/dashboard/my-profile',
                Component: MyProfile
            },
            {
                path:'/dashboard/update-profile',
                Component: UpdateProfile
            },
            {
                path:'/dashboard/my-orders',
                Component: MyOrders
            },
            {
                path:'/dashboard/payment/:orderId',
                Component: Payment
            },
            {
                path:'/dashboard/payment-success',
                Component:PaymentSuccess
            },
            {
                path:'/dashboard/payment-cancelled',
                Component:PaymentCancelled
            },
            {
                path:'/dashboard/my-paymentHistory',
                Component: PaymentHistory
            },
            {
                path:'/dashboard/AllUsers',
                Component: AllUsers
            },
            {
                path:'/dashboard/manageBooks',
                Component:ManageBooks
            }
        ]
    }
])