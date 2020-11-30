import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import * as action from '../store/index';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ordersList = useSelector((state) => state.ordersList);
  const { loading: ordersLoading, error: ordersError, orders } = ordersList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(action.ordersList());
      return;
    } else {
      navigate('/');
    }
  }, [dispatch, userInfo, navigate]);

  // useEffect(() => {
  //   if (orders.length === 0) {
  //     dispatch(action.ordersList());
  //   }
  // }, [orders, dispatch]);

  //   const handleOrderEdit = (orderId) => {
  //     navigate(`/order/${orderId}`);
  //   };

  return (
    <>
      <h1>Orders: {orders.length}</h1>

      {ordersLoading ? (
        <Loader />
      ) : ordersError ? (
        <Message variant='danger'>{ordersError}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER ID</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.user.name}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      // <i className='fas fa-check' style={{ color: 'green' }}></i>
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      className='btn-sm'
                      variant='light'
                      as={Link}
                      to={`/order/${order._id}`}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
