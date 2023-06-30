import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import HeaderNav from "./components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth())
    }, []);

    return ( 
    <>
        <HeaderNav />
        {!isAuth && 
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="search" element={<Search />}></Route>
        </Routes>
        }
    </> 
    );
}
 
export default App;