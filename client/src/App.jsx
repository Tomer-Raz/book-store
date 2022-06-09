import './App.css';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home/homePage.component';
import NotFound from './pages/not-found/notFound.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import Cart from './pages/cart/cart.component';
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path='' element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
