import './App.css';
import Header from './components/header/Header.component';
import Footer from './components/footer/Footer.component';
import Home from './pages/home/Home.component';
import NotFound from './pages/not-found/NotFound.component';
import Login from './pages/login/Login.component';
import Signup from './pages/signup/Signup.component';
import Cart from './pages/cart/Cart.component';
import Details from './pages/details/Details.component';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from './context/Auth.context';
import CartContextProvider from './context/Cart.context';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>

            <Header />
            <Routes>

              <Route path='' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='cart' element={<Cart />} />
              <Route path='book/:bookID' element={<Details />} />
              <Route path='*' element={<NotFound />} />

            </Routes>
            <Footer />

          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
