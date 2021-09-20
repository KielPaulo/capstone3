import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserContext from './UserContext';



import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';


import Header from './components/Header';


function App() {


  const [rootUrl] = useState('http://localhost:4000');
  const [addCartToggle, setAddCartToggle] = useState(false);

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

  }


  useEffect(()=>{

    let token = localStorage.getItem('token');

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
        <UserContext.Provider value={{rootUrl,userInfo, setUserInfo, unsetUserInfo,addCartToggle,setAddCartToggle}}>
        <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path ="/" component ={Home}/>
          <Route exact path ="/login" component ={Login}/>
          <Route exact path ="/register" component ={Register}/>
          <Route exact path ="/products" component ={Products}/>




        </Switch>
        </BrowserRouter>
        </UserContext.Provider>
        

        </>

  
    )


}

export default App;
