import React, { useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])


    const products = [];
  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {
                products.map((product, index) => (
                    <Col sm={12} md={6} lg={4} xl={3} >
                        <h3>
                            <Product product={product} key={index + 1}/>
                        </h3>
                    </Col>
            ))}
        
        </Row> 
    </>
  )
}

export default HomeScreen
