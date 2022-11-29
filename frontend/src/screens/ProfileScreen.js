import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfrimPassword] = useState('')
    const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userRegister)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let navigate = useNavigate();
  const location = useLocation()
  console.log(location)

  useEffect(() => {
    console.log('userInfo :: ', userInfo);
    if(!userInfo){
        navigate('/login')
    }
    else {
        if(!user.name){
            dispatch(getUserDetails('profile'))
        }
        else {
            setName(user.name)
            setEmail(user.email)
        }
    }



  }, [navigate, userInfo, error])

  const submitHandler = (e) => {
    // e.preventDefault()
    /// dispatch registerUser
    if(password !== confrimPassword){
        setMessage("Password Do Not Matched");
    } else {
    // dispatch update Profile
    }
  }

  return (
    <Row>
        <Col md={3}>
        <h1>User Profile</h1>
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

        <Button type='submit' variant='primary'>
            Update
        </Button>

        
      </Form>
        </Col>
        <Col md={9}>
                    MY ORDERS
        </Col>
    </Row>
  )
}

export default ProfileScreen