import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, register, setToDefault } from '../actions/userActions'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfrimPassword] = useState('')
    const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  let navigate = useNavigate();
  const location = useLocation()
  console.log(location)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    // console.log('userInfo :: ', userInfo);
    if (userInfo) {
        
        navigate(redirect)
        // history.push(redirect)
    }
    console.log(error);

    if (error !== undefined || message !== '') {
      setTimeout(() => {
        dispatch(setToDefault())
        setMessage('')
      }, 8000);
    }




  }, [navigate, userInfo, redirect, error])

  const submitHandler = (e) => {
    // e.preventDefault()
    /// dispatch registerUser
    if(password !== confrimPassword){
        setMessage("Password Do Not Matched");
    } else {
    dispatch(register(name, email, password))
    }
  }

  return (
    <Container>
    <Row className='justify-content-md-center'>
      <Col xs={12} md={6}>
      <h1>Sign In</h1>
      {error && <Message variant='danger' error={error} />}
      {message && <Message variant='danger' error={message} />}
      {loading && <Loader />}
      <Form>
      <Form.Group controlId='email'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Confrim Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Confrim password'
            value={confrimPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        
      </Form>
      <Button type='submit' variant='primary' onClick={() => submitHandler()} style={{ marginTop: 20 }}>
          Register
        </Button>

      <Row className='py-3'>
        <Col>
          Have An Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen