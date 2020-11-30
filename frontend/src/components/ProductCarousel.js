import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import * as action from '../store/index';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(action.topRatedProducts());
  }, [dispatch]);

  const topProducts = useSelector((state) => state.productTop);
  const {
    loading: loadingTopProducts,
    products,
    error: topProductsErr,
  } = topProducts;

  // console.log(products);
  return loadingTopProducts ? (
    <Loader />
  ) : topProductsErr ? (
    <Message variant='danger'>{topProductsErr}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products &&
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} ${product.price}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
