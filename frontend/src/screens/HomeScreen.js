import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useSearchParams,
  useParams,
  Link,
} from 'react-router-dom';
import Fuse from 'fuse.js';

import Message from '../components/Message';
import Loader from '../components/Loader';
import * as action from '../store/index';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
// import SearchBox from '../components/SearchBox';

const HomeScreen = () => {
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    dispatch(action.listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  const searchRef = useRef('');

  const keyword = search.get('q');

  // console.log(searchRef);
  // console.log(keyword);

  const productList = useSelector((state) => state.productList);
  const { loading, products, page, pages, error } = productList;

  useEffect(() => {
    if (keyword === '') {
      navigate(`/page/${pageNumber}`);
    }
  }, [keyword, navigate, pageNumber, pages]);

  const fuse = new Fuse(products, {
    keys: ['name', 'brand', 'category'],
    isCaseSensitive: false,
    includeScore: true,
  });

  const filterProducts = !keyword ? products : fuse.search(keyword).sort();

  // console.log(products);
  // console.log(filterProducts);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn-btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col xs={12} sm={12} md={8} lg={6} xlg={6} className='mb-4 ml-auto'>
              <Form inline>
                <Form.Group controlId='SearchBox'>
                  <Form.Control
                    type='text'
                    name='q'
                    placeholder='Search...'
                    ref={searchRef}
                    defaultValue={keyword}
                    className='mr-sm-2 ml-sm-5'
                  ></Form.Control>
                </Form.Group>{' '}
                <Button type='submit' variant='outline-success' className='p-2'>
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {!keyword
              ? filterProducts.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
                    <Product product={product} keyword={false} />
                  </Col>
                ))
              : filterProducts.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product.item._id}>
                    <Product product={product} keyword={true} />
                  </Col>
                ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
