import React, { useEffect, useState } from 'react';
import NavScrollExample from '../Navbar';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  let totalCost = localStorage.getItem('totalCost');

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const TopMargin = {
    marginTop: '80px',
  };

  const Checkout = {
    marginLeft: 'auto', // Push the button to the right
  };

  const CartContainer = {
    height: '100px',
    width: '100px',
    borderRadius: '15px',
  };

  return (
    <>
      <NavScrollExample />
      <div className="cart" style={TopMargin}>
        <h3 className="text-center">Your Cart</h3>
        <Row className="mx-5 mt-5">
          <Col xs={6} className="fw-bold">
            PRODUCT
          </Col>
          <Col xs={2} className="fw-bold">
            PRICE
          </Col>
          <Col xs={2} className="fw-bold">
            QUANTITY
          </Col>
          <Col xs={2} className="fw-bold">
            TOTAL
          </Col>
        </Row>
        <hr />
        {cartItems.map((product, index) => (
          <div key={index}>
            <Row className="mx-5">
              <Col xs={6}>
                <Row>
                  <Col xs={3}>
                    <Card.Img src={'http://localhost:8000' + product.product_image} style={CartContainer} />
                  </Col>
                  <Col xs={9} className="d-flex flex-column">
                    <span>{product.product_title}</span>
                    <span>Total:</span>
                    <span>{product.quantity * product.discounted_price}</span>
                  </Col>
                </Row>
              </Col>
              <Col xs={2} className="mt-4 mx-2">
                {product.discounted_price}
              </Col>
              <Col xs={2} className="mt-4 mx-2">
                {product.quantity}
              </Col>
              <Col className="mt-4">{product.quantity * product.discounted_price}</Col>
            </Row>
            <br />
          </div>
        ))}
        <hr />
        <Row className="mx-5">
          <Col xs={6}></Col>
          <Col xs={2}></Col>
          <Col xs={2} className="fw-bold text-end">
            Net Total:
          </Col>
          <Col className="fw-bold">{totalCost}</Col>
        </Row>
        <br />
        <Row className="mx-5">
          <Col xs={6}></Col>
          <Col xs={2}></Col>
          <Col xs={2}></Col>
          <Col xs={2}>
            <Link to="/order">
            <Button variant="outline-primary" className="checkout" style={Checkout}>
              Checkout
            </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}
