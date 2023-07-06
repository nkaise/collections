import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../actions/user';
import '../css/personalPage.css';
import { Link } from 'react-router-dom';

const PersonalPage = () => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.user.role);

    useEffect(() => {
        dispatch(auth());
    }, []);

    console.log(role)

    return ( 
    <div className='personal-page-main'>
        <h5 className='personal-page-title'>Hello, {role}</h5>
        {(role === 'admin') && <Link to="/users">Users table</Link>}
    </div>
    );
}
 
export default PersonalPage;