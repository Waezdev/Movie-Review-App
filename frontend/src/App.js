import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import MovieReviews from "./components/user/MovieReviews";
import Navbar from "./components/user/Navbar";
import SingleMovie from "./components/user/SingleMovie";
import SearchMovies from "./components/user/SearchMovies";
import SearchByGenre from './components/user/SearchByGenre'
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import AllMovies from "./components/user/AllMovies";
import AllWebSeries from './components/user/AllWebSeries';
import AllTvSeries from './components/user/AllTvSeries';

export default function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path='/allmovies' element={<AllMovies/>}/>
        <Route path='/allwebseries' element={<AllWebSeries/>}/>
        <Route path='/alltvseries' element={<AllTvSeries/>}/>
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="/movie/search" element={<SearchMovies />} />
        <Route path="/movie/searchuser" element={<SearchByGenre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
