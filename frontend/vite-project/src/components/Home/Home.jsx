import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
const Home=()=>{
    const {isAuthorized}=useContext(Context);
    if(!isAuthorized){
        return <Navigate to={"/login"} />
    }
    return (
        <section className="homePage page">
            <h1>Hello</h1>
        </section>
    )
}

export default Home;