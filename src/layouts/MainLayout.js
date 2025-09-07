"use client";
import Header from "@/components/Dashboard/Header/Header";
import Filters from "@/components/Dashboard/Filter/Filters";
import Budgets from "@/components/Dashboard/Budgets/Budgets";
import Footer from "@/components/Dashboard/Footer/Footer";
import {ToastContainer} from "react-toastify";

export default function MainLayout({ children }) {
    return (
       <>
       <Header/>
       <Filters/>
       <Budgets/>
       <Footer/>

       <ToastContainer
           position="top-right"
           autoClose={3000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="colored"
       />
       </>
    );
}
