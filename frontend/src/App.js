import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='login' element={<LoginScreen />} />
            <Route path='register' element={<RegisterScreen />} />
            <Route path='profile' element={<ProfileScreen />} />
            <Route path='product/:id' element={<ProductScreen />} />
            <Route path='cart'>
              <Route path='/' element={<CartScreen />} />
              {/* TODO USING AN OUTLET (WITH A DIFFERENT COMPONENT ) or Only change the add to cart button on the UI */}
              <Route path=':id' element={<CartScreen />} />
            </Route>
            <Route path='shipping' element={<ShippingScreen />} />
            <Route path='payment' element={<PaymentScreen />} />
            <Route path='placeorder' element={<PlaceOrderScreen />} />
            <Route path='order/:id' element={<OrderScreen />} />
            <Route path='admin/users' element={<UserListScreen />} />
            <Route path='admin/products' element={<ProductListScreen />} />
            <Route
              path='admin/products/page/:pageNumber'
              element={<ProductListScreen />}
            />
            <Route path='admin/orders' element={<OrderListScreen />} />
            <Route path='admin/product/new' element={<ProductCreateScreen />} />
            <Route path='admin/user/:id/edit' element={<UserEditScreen />} />
            <Route
              path='admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='page/:pageNumber' element={<HomeScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default App;
