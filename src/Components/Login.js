import React, { useRef, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:3001/LogerData"
})
export default function Login() {
    const email = useRef(null);
    const pass = useRef(null);
    const [error, setError] = useState(null);
    const [empList, setLoger] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        client.get()
            .then(res => { setLoger(res.data) })
        sessionStorage.removeItem('user')

    }, [])
    const validate = async (event) => {
        event.preventDefault();
        setError({ msg: '', check: false })
        let e = await empList.find(x => x.email === email.current.value)
        let eindex = empList.indexOf(e);
        if (eindex + 1) {
            if (empList[eindex].password === pass.current.value) {
                sessionStorage.setItem('user', JSON.stringify(empList[eindex]));
                alert('done')
                navigate('/home')
            }
            else {
                setError({ msg: 'password not match', check: true })

            }
        }
        else {
            setError({ msg: 'Enter vaild email address', check: true })

        }
    }

    return (
        <div className="bg1">
            <h1 className='title'>Log in</h1>
            <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/03/16/4p1W6RcD97vSfBswLFMaonix/abandoned_cart/images/icon_shopping_cart.gif" style={{ height: "80px", width: "80px", borderRadius: "50%", margin: "10px auto", display: 'block' }} />
            <form className="blurform" onSubmit={validate}>
                {error && error.check && <Alert variant="danger" onClose={() => setError({ msg: '', check: false })} dismissible>
                    <Alert.Heading>{error.msg}</Alert.Heading>
                </Alert>}
                <Form.Floating className="mb-4">
                    <Form.Control
                        type="email"
                        placeholder="paras@gmail.com"
                        ref={email}
                    />
                    <label>Email ID</label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass}
                    />
                    <label>Enter Password</label>
                </Form.Floating>
                <Button
                    className='lsbtn'
                    type="submit">
                    Login
                </Button>
            </form>
            <br />
            <h6>Don't have an account? <Link to='/sign'><Button className='lssbtn' size="sm">
                Sign Up
            </Button></Link></h6>
        </div>
    )
}
