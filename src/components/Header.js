import React, {useContext, useState, useEffect} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import UserContext from './../UserContext'
import {useHistory, NavLink} from 'react-router-dom'
import cartIco from "./../images/icons8-shopping-cart-64_2.png";


export default function Header(){

	const {userInfo, unsetUserInfo} = useContext(UserContext);
	const {rootUrl} = useContext(UserContext);
	const {addCartToggle} = useContext(UserContext);
	const token =  localStorage.getItem('token');
	const [cartItemCount, setCartItemCount] = useState(0);


	let history = useHistory();


	const logout =()=>{
		  setCartItemCount(0);
		  unsetUserInfo();

		  history.push('/login')
	}

	
useEffect(()=>{

	fetch(`${rootUrl}/api/users/getCartItems`,{

		method: "GET",
		headers:{

			"Authorization": `Bearer ${token}`
		}
	})
	.then(result=>result.json())
	.then(result=>{

		//console.log(result);

		let itemCount=0

		result.forEach(e=>{

			itemCount += e.quantity;

		})

		setCartItemCount(itemCount);

		
	}).catch(err=>{

		
	})


}, [userInfo,addCartToggle])


	let userNav = (userInfo.userId == null) ? 
	<>
	<NavDropdown.Item href="/login">Login</NavDropdown.Item>
	<NavDropdown.Item as = {NavLink} to="/register">Register</NavDropdown.Item>
	</>

	:
	<>
	<NavDropdown.Item href="#" onClick ={logout}>Logout</NavDropdown.Item>
	<NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
	<NavDropdown.Item href="#action/3.2">{userInfo.firstName}</NavDropdown.Item>
	</>



	return (

		<Navbar bg="light" expand="lg">
		  <Navbar.Brand as = {NavLink} to="/">Japan Goods</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link as = {NavLink} to="/">Home</Nav.Link>
		      <Nav.Link as = {NavLink} to="/products">Products</Nav.Link>
		      <NavDropdown title="Account" id="basic-nav-dropdown">
		      {userNav}
		        
		      </NavDropdown>
		    </Nav>
		    <span inline>
		  		<span>{userInfo.firstName} {userInfo.lastName} </span>
		  		<span className="parentCart"><span id="cartItemCount">{cartItemCount}</span><img src={cartIco} id="cartIcon"/></span>
		    </span>
		  </Navbar.Collapse>
		</Navbar>


		)
}