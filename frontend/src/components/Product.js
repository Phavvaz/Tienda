import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product, keyword }) => {
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        <Link
          to={
            keyword ? `/product/${product.item._id}` : `/product/${product._id}`
          }
        >
          <CardImg
            src={keyword ? product.item.image : product.image}
            variant='top'
          />
        </Link>

        <Card.Body>
          <Link
            to={
              keyword
                ? `/product/${product.item._id}`
                : `/product/${product._id}`
            }
          >
            <Card.Title as='div'>
              <strong>{keyword ? product.item.name : product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating
              value={keyword ? product.item.rating : product.rating}
              text={
                keyword
                  ? `${product.item.numReviews} reviews`
                  : `${product.numReviews} reviews`
              }
            />
          </Card.Text>

          <Card.Text as='h3'>
            ${keyword ? product.item.price : product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
