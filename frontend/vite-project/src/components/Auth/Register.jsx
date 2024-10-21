import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {FaPhoneFlip} from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Register=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [name,setName]=useState("");

    const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

    const handleRegister=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(
                "http://localhost:3000/api/v1/user/register",
                {name,email,password,phone},
                {withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                },
            });
            toast.success(data.message);
            setName("");
            setEmail("");
            setPhone("");
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
                        <h3>Create a new Account</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <div>
                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                                <FaPencilAlt />
                            </div>
                        </div>
                        <div className="inputTag">
                            <div>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <div className="inputTag">
                            <div>
                                <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number"/>
                                <FaPhoneFlip />
                            </div>
                        </div>
                        <div className="inputTag">
                            <div>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button onClick={handleRegister} type="submit">Register</button>
                        <Link to={"/login"}>Already have an account?</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/register.png" alt="register" />
                </div>
            </div>
        </>
    )
};

export default Register;