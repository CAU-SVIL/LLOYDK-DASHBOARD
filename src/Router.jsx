import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "/src/pages/Home";
import Collection from "/src/pages/Collection"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection/:collectionName" element={<Collection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;