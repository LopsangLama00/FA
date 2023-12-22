import React, { useEffect, useState } from 'react';
import NavScrollExample from '../Navbar';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from '../AxiosRequests/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(''); // Added shippingAddress state
  let totalCost = localStorage.getItem('totalCost');


  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleCheckout = async () => {
    try {
      // Create an order object with shippingAddress, products, and GrandTotal
      const order = {
        address: shippingAddress,
        products: cartItems.map((product) => product.id), // Assuming you have product IDs in cartItems
        GrandTotal: parseFloat(totalCost),
      };
      console.log(order)
      // Make a POST request to create the order
      const response = await axios.post('/order', order);
  
      if (response.status === 201) {
        // Order created successfully, you can redirect to an order confirmation page
        toast.success("Order Placed Succesfully")
        setTimeout(()=>{
            navigate("/")
          },2000)
      } else {
        console.error('Failed to create the order');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("Bad Request")
    }
  };

  const TopMargin = {
    marginTop: '80px',
  };

  const Checkout = {
    marginLeft: 'auto',
  };

  const CartContainer = {
    height: '100px',
    width: '100px',
    borderRadius: '15px',
  };

  return (
    <>
    <ToastContainer />
      <NavScrollExample />
      <div className="cart" style={TopMargin}>
        <h3 className="text-center"> Your Cart </h3>
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
                  <Card.Img src={'http://localhost:8000' + product.product_image} style={CartContainer} />
                  <Col className="mx-2 mt-4">{product.product_title}</Col>
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
   <br/>
        <Row className="mx-5">
            <Col xs={6}></Col>
            <Col xs={2}></Col>
            <Col xs={2} className="fw-bold">
                Shipping Address:
            </Col>
            <Col >
                <input
                type="text"
                className="form-control"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                />
            </Col>
        </Row>
        <br/>
        <Row className="mx-5">
          <Col xs={6}></Col>
          <Col xs={2}></Col>
          <Col xs={2}></Col>
          <Col xs={2}>
            <Button variant="primary" className="checkout" style={Checkout} onClick={handleCheckout}>
              Checkout
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
