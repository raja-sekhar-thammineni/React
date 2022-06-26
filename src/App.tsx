import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./hooks";
import Navigation from "./components/Navigations";

import useAPIConsumer from "./Helpers/APIConsumer";
import HomePage from "./Pages/Home/HomePage";
import Wishlist from "./Pages/Home/wishlist";
import { setDataOnInitialLoad } from "./Reducers/HomeReducer";
import CartPage from "./Pages/Home/CheckoutPage";
import CourseOverview from "./Pages/Home/CourseOverview";
import Modal from "./Helpers/Modal";

import ProfilePage from "./Pages/Home/ProfilePage";
const App =()=> {
  const { data } = useAPIConsumer();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDataOnInitialLoad(data));
  }, [data,dispatch]);

  return (
    <div className="App">
      <Router>
        <Modal />
        <Navigation />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="Wishlist" element={<Wishlist />} />
          <Route path="Cart" element={<CartPage />} />
          <Route path="Overview/:id" element={<CourseOverview />}/>
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
