import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../actions/user';

const PersonalPage = () => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.user.role);

    useEffect(() => {
        dispatch(auth());
    }, []);

    return ( 
    <div>My page
        <h2>Hello, {role}</h2>
    </div>
    );
}
 
export default PersonalPage;