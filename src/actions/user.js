import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/auth/register`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:3001/api/auth/login`, {
                email,
                password,
            })
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
};

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:3001/api/auth/auth`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            dispatch(setUser({ user: response.data.user, role: response.data.user.role }));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token'); 
        }
    }
}

export const users = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/data/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  export const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/data/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  export const updateUser = async (userId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/data/users/${userId}/`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  
  
  