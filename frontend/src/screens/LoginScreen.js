import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  let navigate = useNavigate();
  const location = useLocation()
  console.log(location)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    console.log('userInfo :: ', userInfo);
    if (userInfo) {
        
        navigate(redirect)
        // history.push(redirect)
    }
    console.error(error);
  }, [navigate, userInfo, redirect, error])

  const submitHandler = (e) => {
    // e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Container>
    <Row className='justify-content-md-center'>
      <Col xs={12} md={6}>
      <h1>Sign In</h1>
      {error && <Message variant='danger' error={error} />}
      {loading && <Loader />}
      <Form>
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

        
      </Form>
      <Button type='submit' variant='primary' onClick={() => submitHandler()}>
          Sign In
        </Button>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen