import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import * as action from '../store/index';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: userDeleteLoading,
    success: deleteSuccess,
    error: userDeleteErr,
  } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(action.listUsers());
    } else {
      navigate('/');
    }
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(action.listUsers());
    }
  }, [deleteSuccess, dispatch]);

  //   const handleUserEdit = (userId) => {
  //     navigate(`/users/${userId}/edit`);
  //   };

  const handleUserDelete = (userId) => {
    // console.log('deleted');
    dispatch(action.deleteUser(userId));
  };

  return (
    <>
      <h1>Users: {users.length}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    className='btn-sm'
                    variant='light'
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    // onClick={() => handleUserEdit(user._id)}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>

                  <Button
                    variant='danger'
                    className='btn-sm '
                    onClick={() => handleUserDelete(user._id)}
                  >
                    <i className='fas fa-trash'></i>
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

export default UserListScreen;
