import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import '../css/forms.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../actions/user';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      try {
        await dispatch(login(data.email, data.password));
        navigate("/collections");
      } catch (error) {
        toast.error("Invalid email or password");
      }
    };

    return ( 
    <div className="form">
        <ToastContainer />
        <h3>Login</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            {...register("email", { required: true })}
            onChange={(e) => { setEmail(e.target.value) }} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true, minLength: 8 })}
            onChange={(e) => { setPassword(e.target.value) }}
            /> 
            {errors.password && <p>Password contains at least 8 symbols</p>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
    </div> 
  );
}
 
export default Login;