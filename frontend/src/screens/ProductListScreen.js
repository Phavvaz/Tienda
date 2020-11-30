import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import * as action from '../store/index';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListScreen = () => {
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    loading: productsLoading,
    error: productsError,
    products,
    page,
    pages,
  } = productList;

  console.log(products);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    success: productDeleteSuccess,
    error: productDeleteErr,
  } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(action.listProducts(pageNumber));
    } else {
      navigate('/');
    }
  }, [dispatch, userInfo, navigate, productDeleteSuccess, pageNumber, pages]);

  //   const handleProductEdit = (productId) => {
  //     navigate(`/products/${productId}/edit`);
  //   };

  const handleCreateProduct = () => {
    navigate('/admin/product/new');
  };

  const handleProductDelete = (productId) => {
    // console.log('deleted');
    dispatch(action.deleteProduct(productId));
  };

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col>
          <h1>Products: {products.length}</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {productDeleteLoading && <Loader />}
      {productDeleteSuccess && (
        <Message variant='success'>Deleted Successfully...</Message>
      )}
      {productDeleteErr && (
        <Message variant='danger'>{productDeleteErr}</Message>
      )}
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <Message variant='danger'>{productsError}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>COUNT IN STOCK</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button
                      className='btn-sm'
                      variant='light'
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      // onClick={() => handleUserEdit(user._id)}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm '
                      onClick={() => handleProductDelete(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
