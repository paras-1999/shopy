import React, { useRef, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:3001/LogerData"
})
const regForName = RegExp(/^[A-Z a-z]{4,29}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
export default function SignUp() {
    const [error, setError] = useState('');
    const name = useRef(null);
    const email = useRef(null);
    const pass1 = useRef(null);
    const pass2 = useRef(null);
    const navigate = useNavigate();
    const register = (event) => {
        event.preventDefault();
        setError({ msg: '', check: false })
        if (name.current.value === '' || email.current.value === '' || pass1.current.value === '' || pass2.current.value === '') {
            setError({ msg: 'Missing Field', check: true })
        }
        else if (!regForName.test(name.current.value)) {
            setError({ msg: 'Enter a Proper Name', check: true })

        }
        else if (!regForEmail.test(email.current.value)) {
            setError({ msg: 'Enter vaild email address', check: true })

        }
        else if (!regForPass.test(pass1.current.value)) {
            setError({ msg: 'enter a password with atleast one special character and numeriv value  (6-16) ', check: true })

        }
        else if (pass2.current.value != pass1.current.value) {
            setError({ msg: 'password not match', check: true })

        }
        else {
            let newUser = { name: name.current.value, email: email.current.value, password: pass1.current.value };
            client.post('', newUser);
            alert('Registered Successfully')
            navigate('/')
        }
    }
    return (
        <div className="bg1">
            <h1 className='title'>Sign Up <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/03/16/4p1W6RcD97vSfBswLFMaonix/abandoned_cart/images/icon_shopping_cart.gif" style={{ height: "80px", width: "80px", borderRadius: "50%" }} /></h1>
            <form className="blurform" onSubmit={register}>
                {error.check ? <Alert variant="danger" onClose={() => setError({ msg: '', check: false })} dismissible>
                    <Alert.Heading>{error.msg}</Alert.Heading>
                </Alert> : ''}
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Paras Saxena"
                        ref={name}
                    />
                    <label>Name</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="paras@gmail.com"
                        ref={email}
                    />
                    <label>Email ID</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass1}
                    />
                    <label>Create Password</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass2}
                    />
                    <label>R-Password</label>
                </Form.Floating>
                <Button className='lsbtn' type="submit">
                    Register
                </Button>
            </form>
            <br />
            <h6>Have an account? <Link to="/"><Button className="lssbtn" size="sm">
                Log In
            </Button></Link></h6>
        </div>
    )
}
