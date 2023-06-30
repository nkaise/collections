import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import '../css/forms.css';
import { useState } from 'react';
import { registration } from '../actions/user';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (data) => {
        if (isValid) {
            registration(data.email, data.password);
        } else {
          alert('Форма содержит ошибки');
        }
      };

    return ( 
    <div className="form">
        <h3>Registration</h3>
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
            Sign up
          </Button>
        </Form>
    </div> );
}
 
export default Register;