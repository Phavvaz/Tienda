import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import * as action from '../store/index';
import { PRODUCT_CREATE_RESET } from '../store/actionCreators/actionTypes';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(Number(1));
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo && !userInfo.isAdmin) {
      navigate('/');
    }
    if (successCreate) {
      navigate('/admin/products');
    }
  }, [dispatch, userInfo, navigate, successCreate]);

  const handleGoToHomeBtn = () => {
    navigate('/admin/products');
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT_CREATE_RESET });
    const product = {
      name,
      price,
      description,
      category,
      countInStock,
      image,
      brand,
    };
    dispatch(action.createProduct(product));
  };

  return (
    <>
      <Button className='btn btn-light' onClick={handleGoToHomeBtn}>
        Go Back
      </Button>

      <FormContainer>
        <h1>Sign Up</h1>
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={handleCreateProduct}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter product price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* TODO: Form control as select//option for category and brand */}
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter count in stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Input Product Url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.File
            id='img-file'
            label='Choose File'
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && <Loader />}

          {loadingCreate && <Loader />}
          <Button type='submit' variant='primary' className='btn-block'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
