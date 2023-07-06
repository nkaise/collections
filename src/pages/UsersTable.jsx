import React, { useEffect, useState } from 'react';
import { deleteUser, updateUser, users } from "../actions/user";
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import '../css/usersTable.css';

const UsersTable = () => {
    const [usersData, setUsersData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
  
    const fetchUsersData = async () => {
      try {
        const data = await users();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchUsersData();
    }, []);
  
    const handleCheckboxChange = (userId) => {
      if (checkedItems.includes(userId)) {
        setCheckedItems(checkedItems.filter((id) => id !== userId));
      } else {
        setCheckedItems([...checkedItems, userId]);
      }
    };
  
    const handleDeleteUser = async () => {
      try {
        for (const userId of checkedItems) {
          await deleteUser(userId);
        }
        fetchUsersData();
        setCheckedItems([]);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    };

    const handleStatusUser = async (buttonType) => {
        try {
          for (const userId of checkedItems) {
            const currentUser = usersData.find((user) => user._id === userId);
            if (currentUser) {
              if (currentUser.status === "active" && buttonType != "unblock") {
                await updateUser(userId, "blocked");
              } else if (currentUser.status === "blocked" && buttonType != "block") {
                await updateUser(userId, "active");
              }
            }
          }
          fetchUsersData();
          setCheckedItems([]);
        } catch (e) {
          console.error(e);
        }
      };
      
  
    return (
      <>
        <h2 className='user-title'>User table</h2>
        <ButtonGroup aria-label="Basic example" className='user-buttons'>
          <Button variant="danger" onClick={() => handleStatusUser("block")}>Block</Button>
          <Button variant="success" onClick={() => handleStatusUser("unblock")}>Unblock</Button>
          <Button variant="dark" onClick={handleDeleteUser}>Delete</Button>
          <Button variant="primary" onClick={() => handleAdminUser("addToAdmin")}>Make an admin</Button>
          <Button variant="warning" onClick={() => handleAdminUser("removeFromAdmin")}>Delete from admin</Button>
        </ButtonGroup>
  
        <Table striped bordered hover variant='secondary' className='user-table'>
          <thead>
            <tr>
              <th><Form.Check /></th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(item => (
              <tr key={item._id}>
                <td>
                  <Form.Check
                    onChange={() => handleCheckboxChange(item._id)}
                    checked={checkedItems.includes(item._id)}
                  />
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  
  export default UsersTable;
  