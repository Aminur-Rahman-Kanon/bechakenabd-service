import React, {createContext, useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Homepage from './Components/Homepage/homepage';
import ProductDetails from './Components/Products/ProductDetails/productDetails';
import ProductSummary from './Components/Products/ProductSummary/productSummary';
import ProductList from './Components/Products/ProductList/productList';
import AddProducts from './Components/Products/AddProducts/addroducts';
import BlogProducts from './Components/Products/BlogProducts/blogProduct';
import BlogProductDisplay from './Components/Products/BlogProducts/BlogProductDisplay/blogProductDisplay';
import logo from './Assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faPhone, faMessage, faUsers, faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Backdrop from './Components/Others/Backdrop/backdrop';
import { useQuery } from 'react-query';

export const AuthContext = createContext(null);

function App() {

  const [drawtoggle, setDrawToggle] = useState(false);

  const [backdrop, setBackdrop] = useState(false);

  const { data, isError, error, isLoading } = useQuery(['products'], async () => {
    const data = await fetch('https://bechakenabd.onrender.com/products/get-products').then(res => res.json()).then(result => result.data).catch(err => err);
    return data;
  }, { staleTime: 120000 })

    useEffect(() => {
      if (backdrop) {
        disableScroll()
      }
      else {
        window.onscroll= () => {}
      }
    }, [backdrop])

    const showSideDrawer = () => {
      setBackdrop(true);
      setDrawToggle(true);
    }

    const closeSideDrawer = () => {
      setBackdrop(false);
      setDrawToggle(false);
    }

    const disableScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)
    }

  return (
    <>
    <Backdrop backdrop={backdrop } closeSideDrawerDisplay={ closeSideDrawer }/>
    <div className="App">
      <div className='draw-toggle-container' onClick={ showSideDrawer }>
        <div className='draw-toggle-bar'></div>
        <div className='draw-toggle-bar'></div>
        <div className='draw-toggle-bar'></div>
      </div>
      <div className={drawtoggle ? `sidePanelContainer display` : 'sidePanelContainer'}>
          <div className="logoContainer">
              <img src={logo} alt="karkhana" className="logo"/>
          </div>
          <ul className="sidePanelItems">
              <li className="sidePanelItem">
                <Link to="/" className="sidePanelLink">
                  <FontAwesomeIcon icon={faDesktop} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Home</p>
                </Link>
              </li>
              <li className="sidePanelItem">
                <Link to='/sells' className='sidePanelLink'>
                  <FontAwesomeIcon icon={faCartShopping} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Sells</p>
                </Link>
              </li>
              <li className="sidePanelItem">
                <Link to='/product-list' className='sidePanelLink'>
                  <FontAwesomeIcon icon={faBagShopping} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Products</p>
                </Link>
              </li>
              <li className="sidePanelItem">
                <Link to="/contacts" className='sidePanelLink'>
                  <FontAwesomeIcon icon={faPhone} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Contacts</p>
                </Link>
              </li>
              <li className="sidePanelItem">
                <Link to='/feedback' className='sidePanelLink'>
                  <FontAwesomeIcon icon={faMessage} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Feedback</p>
                </Link>
              </li>
              <li className="sidePanelItem">
                <Link to='/registered-users' className='sidePanelLink'>
                  <FontAwesomeIcon icon={faUsers} className="sidePanelIcon"/>
                  <p className="sidePanelItemP">Registered Users</p>
                </Link>
              </li>
          </ul>
      </div>
      <AuthContext.Provider value={data}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/product-list' element={<ProductList />} />
          <Route path='/blogItems' element={<BlogProducts />}/>
          <Route path='/blogItems/:blogId/:index' element={<BlogProductDisplay />}/>
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/product/:productCategory/:productId' element={<ProductSummary/>} />
          <Route path='/add-products/:productId' element={<AddProducts />} />
          <Route path='*' element={<h2>Not found</h2>} />
        </Routes>
      </AuthContext.Provider>
    </div>
    </>
  );
}

export default App;
