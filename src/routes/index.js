// import DefaultLayout from "../DefaultLayout";
import { Navigate } from "react-router-dom";
import BarcodeScanner from "../page/BarcodeScanner";
import Calendar from "../page/Calendar";
import Home from "../page/Home";
import Scan2InsertOrder from "../page/Scan2InsertOrder";
import SignIn from "../page/SignIn";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/signin" />, 
  },
  { path: "/home", element: <Home/>},
  { path: "/barcodeScanner", element: <BarcodeScanner />},
  { path: "/scan2InsertOrder", element: <Scan2InsertOrder />},
  { path: "/calendar", element: <Calendar />},
  { path: "/signin", element: <SignIn /> },
];
