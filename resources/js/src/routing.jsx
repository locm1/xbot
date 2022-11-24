import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Paths } from "@/paths";
import SignIn from "@/pages/auth/Signin"

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Signin.path} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;