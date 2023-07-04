import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import HeaderNav from "./components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import PersonalPage from "./pages/PersonalPage";

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());
    }, []);

    return ( 
    <>
        <HeaderNav />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="search" element={<Search />}></Route>
            </Routes>
            {(!isAuth) ? 
            <Routes>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
            </Routes>
            : 
            <Routes>
                <Route path="mypage" element={<PersonalPage role={role} />}></Route>
            </Routes>
            }
    </> 
    );
}
 
export default App;