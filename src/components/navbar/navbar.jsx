import { Nav, NavLink, Navbar, Button } from "react-bootstrap";
import Search from "../../pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const HeaderNav = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    return ( 
    <>
        <Navbar style={{justifyContent: "center"}}>
            <Search />
            <Nav>
                <NavLink href="/">Home</NavLink>
                {!isAuth && <NavLink href="login">Login</NavLink>}
                {!isAuth && <NavLink href="register">Registration</NavLink>}
                {isAuth && <Button variant="info" onClick={() => dispatch(logout())}>Logout</Button>}
            </Nav>
        </Navbar>
    </> );
}
 
export default HeaderNav;