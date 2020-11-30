import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className='justify-content-center-mb-4'>
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to='/shipping'>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/payment'>
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='/placeorder'>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
