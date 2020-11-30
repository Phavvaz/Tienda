import React from 'react';
import { Helmet } from 'react-helmet';

export const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Tienda',
  description: 'We sells afordable products',
  keyword: 'Electronics, cheap electronics',
};

export default Meta;
