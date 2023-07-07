import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../actions/user';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
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
        <p>My collections:</p>
        <ButtonGroup aria-label="Basic example" className='user-buttons'>
          <Button variant="success">Create</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="primary">Edit</Button>
        </ButtonGroup>
        <Table striped bordered hover variant='secondary'>
          <thead>
            <tr>
              <th><Form.Check /></th>
              <th>Collection name</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td><Link>Name</Link></td>
              </tr>
          </tbody>
        </Table>
    </div>
    );
}
 
export default PersonalPage;