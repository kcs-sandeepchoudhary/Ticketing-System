import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/register";
import Booking from "../ticket/Booking";

const Menu=()=>{
    return(<>
    <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route  path="/register" element={<Register/>} />
        <Route path="/get_ticket" element={<Booking/>} />
    </Routes>
    </>)
}
export default Menu;