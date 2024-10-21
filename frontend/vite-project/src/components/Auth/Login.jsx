import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {FaPhoneFlip} from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(
                "http://localhost:3000/api/v1/user/login",
                {email,password},
                {withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                },
            });
            toast.success(data.message);
            setEmail("");
            setPassword("");
            setIsAuthorized(true);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if(isAuthorized){
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <div className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="/WorkByte_logo_black_1.png" alt="logo" />
                        <h3>Log in to your account</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <div>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <div className="inputTag">
                            <div>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button onClick={handleLogin} type="submit">Login</button>
                        <Link to={"/register"}>Don't have an account?</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/Login1.png" alt="login" />
                </div>
            </div>
        </>
    )
};

export default Login;