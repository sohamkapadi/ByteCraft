import React,{ useState,useEffect, useContext } from 'react'
import "./App.css";
import {Context} from "./main";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login  from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound"
import axios from "axios";
import {Toaster} from "react-hot-toast";

const App = () => {
  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

  useEffect(()=>{
    const fetchUser= async()=>{
      try {
        const response=await axios.get("http://localhost:3000/api/v1/user/getuser",{withCredentials:true});
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  },[isAuthorized]);

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
      <Toaster />
    </Router>
    </>
  );
}

export default App
