import React from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import "./App.css";

import AboutPage from "./pages/AboutPage";

import Dashboard from "./pages/admin/Dashboard";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import ProductDetail from './pages/ProductDetail';
import PrivateRoute from './components/PrivateRoute';
import ProductForm from "./pages/admin/ProductForm";
import AuthForm from './pages/admin/AuthForm';
import LayoutClient from './Layouts/LayoutClient';
import LayoutAdmin from './Layouts/LayoutAdmin';





export default function App(){
 


     

  return (
    <>
      
      <main className="">
        <Routes>
           <Route path="/" element={<LayoutClient/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
        

        <Route path="/login" element={<AuthForm/>} />
        <Route path="/register" element={<AuthForm isRegister />} />
        {/*} Private rpute for admin*/}
        <Route path="/admin" element={<PrivateRoute/>}>
        <Route path="/admin" element={<LayoutAdmin/>}>
         <Route index element={<Dashboard />} />       
         <Route path="/admin/product-add" element={<ProductForm  />} />
         <Route path="/admin/product-edit/:id" element={<ProductForm />} />
         </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
    </>
  );
  }
