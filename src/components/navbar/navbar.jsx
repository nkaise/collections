import { Nav, NavLink, Navbar, Button } from "react-bootstrap";
import Search from "../../pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const HeaderNav = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return ( 
    <>
        <Navbar style={{justifyContent: "center"}}>
            <Search />
            <Nav>
                <NavLink href="/">Home</NavLink>
                {!isAuth && <NavLink href="login">Login</NavLink>}
                {!isAuth && <NavLink href="register">Registration</NavLink>}
                {isAuth && <NavLink href="mypage">My page</NavLink>}
                {isAuth && <Button variant="info" onClick={() => dispatch(logout()) && navigate("/")}>Logout</Button>}
            </Nav>
        </Navbar>
    </> );
}
 
export default HeaderNav;