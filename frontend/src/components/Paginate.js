import React from 'react';
import { Pagination, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false }) => {
  const navigate = useNavigate();
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            as={Button}
            onClick={() =>
              navigate(
                !isAdmin ? `/page/${x + 1}` : `/admin/products/page/${x + 1}`
              )
            }
            key={x + 1}
            // to={`/page/${x + 1}`}
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
