import './App.css';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home/homePage.component';
import NotFound from './pages/not-found/notFound.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import Cart from './pages/cart/cart.component';
import Details from './pages/details/details.component';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksContextProvider from './context/Books.context';
import AuthContextProvider from './context/Auth.context';
import CartContextProvider from './context/Cart.context';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <BooksContextProvider>
            <CartContextProvider>

              <Header />
              <Routes>

                <Route path='' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path='cart' element={<Cart />} />
                <Route path='book/:bookID' element={<Details />} />
                <Route path='*' element={<NotFound />} />

              </Routes>
              <Footer />

            </CartContextProvider>
          </BooksContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
