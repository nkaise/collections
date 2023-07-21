import { Nav, NavLink, Navbar, Button } from "react-bootstrap";
import Search from "../../pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import BtnDarkMode from "../btnDarkMode/BtnDarkMode";
import './style.css';

const HeaderNav = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return ( 
    <>
        <Navbar style={{justifyContent: "center"}} className="navbar">
            <Nav>
                <NavLink href="/"><span className="navbar__link">Home</span></NavLink>
                {!isAuth && <NavLink href="login"><span className="navbar__link">Login</span></NavLink>}
                {!isAuth && <NavLink href="register"><span className="navbar__link">Registration</span></NavLink>}
                {isAuth && <NavLink href="/collections"><span className="navbar__link">Collections</span></NavLink>}
                {isAuth && <Button variant="info" onClick={() => dispatch(logout()) && navigate("/")}>Logout</Button>}
            </Nav>
            <BtnDarkMode />
        </Navbar>
    </> );
}
 
export default HeaderNav;