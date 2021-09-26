import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserContext from './UserContext';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';




import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductView from './pages/ProductView';
import MyOrders from './pages/MyOrders';


import Header from './components/Header';
import Footer from './components/Footer';


function App() {


  const [rootUrl] = useState('http://localhost:4000');
  const [cartItemArr, setCartItemArr] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  let token = localStorage.getItem('token');
  const [showAlert, setShowAlert] = useState(false);


  const [userInfo, setUserInfo] = useState({

    userId: null,
    isAdmin: null,
    firstName: null,
    lastName: null

  });

  const unsetUserInfo =()=>{

    localStorage.clear();

    setUserInfo({

        userId: null,
        isAdmin: null,
        firstName: null,
        lastName: null

    })

    setCartItemCount(0);

  }

const getCartItems = ()=>{


  fetch(`${rootUrl}/api/users/getCartItems`,{

    method: "GET",
    headers:{

      "Authorization": `Bearer ${token}`
    }
  })
  .then(result=>result.json())
  .then(result=>{
  
    let itemCount=0

    result.forEach(e=>{

      itemCount += e.quantity;

    })

    setCartItemCount(itemCount);
    setCartItemArr(result);
    
  }).catch(err=>{

    
  })

}


const addToCart = (pId, qtyValue)=>{

  if(qtyValue == undefined){

    qtyValue = 1;
  }

  fetch(`${rootUrl}/api/users/addToCart/${pId}`,{


    method: "PUT",
    headers:{

      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body:JSON.stringify({

      quantity:qtyValue

    })
  })

  .then(result => result.json())
  .then(result=>{

    
    if(Object.keys(result).length !== 0){

      alertify.set('notifier','position', 'top-center');
      alertify.set('notifier','delay', 2)
      alertify.success('Added to cart');
  
      getCartItems();

    setTimeout(function(){ setShowAlert(false); }, 1250);

    }else{

      console.log('Something went wrong');

    }
  })
}

 





  useEffect(()=>{

    fetch(`${rootUrl}/api/users/details`,{

      method: "GET",
      headers: {

        "Authorization": `Bearer ${token}`
      }


    })
    .then(result=>result.json())
    .then(result=>{

      if(typeof result._id !== "undefined"){

        setUserInfo({

         userId: result._id,
         isAdmin: result.isAdmin,
         firstName: result.firstName,
         lastName: result.lastName

        })

      }

      
    })


  },[])//this useeffect asynchronously update cart count idk why, if only without the additional [] in the end





  return (
        <>
        <UserContext.Provider value={{rootUrl,userInfo, setUserInfo, unsetUserInfo, cartItemCount, cartItemArr, getCartItems, addToCart, showAlert, setShowAlert}}>
        <BrowserRouter>
        <Header/>
        <Switch>
        <body className="pt-5">
        <Container className="mt-5 main">
          <Route exact path ="/" component ={Home}/>
          <Route exact path ="/login" component ={Login}/>
          <Route exact path ="/register" component ={Register}/>
          <Route exact path ="/products" component ={Products}/>
          <Route exact path ="/cart" component ={Cart}/>
          <Route exact path ="/productView/:productId" component ={ProductView}/>
          <Route exact path ="/myOrders" component ={MyOrders}/>
 
        </Container>


          </body>

        </Switch>
         <Footer/>
        </BrowserRouter>
        </UserContext.Provider>
        

        </>

  
    )


}

export default App;
