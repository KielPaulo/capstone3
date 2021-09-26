import React, {useContext, useState, useEffect} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import UserContext from './../UserContext'
import {useHistory, NavLink, Link} from 'react-router-dom'
import cartIco from "./../images/icons8-shopping-cart-64_2.png";


export default function Header(){

	const {userInfo, unsetUserInfo} = useContext(UserContext);
	const {rootUrl} = useContext(UserContext);
	const {addCartToggle} = useContext(UserContext);
	const {removeCartToggle, setRemoveCartToggle} = useContext(UserContext);
	const {cartItemArr, setCartItemArr} = useContext(UserContext);
	const {cartItemCount} = useContext(UserContext);
	const {getCartItems} = useContext(UserContext);
	const token =  localStorage.getItem('token');


	let history = useHistory();


	const logout =()=>{

		  unsetUserInfo();

		  history.push('/login')
	}


	useEffect(()=>{


		getCartItems();


	},[userInfo])


	let userNav;

	if(userInfo.userId == null){

	userNav =
		<><NavDropdown.Item href="/login">Login</NavDropdown.Item>
		<NavDropdown.Item as = {NavLink} to="/register">Register</NavDropdown.Item></>

	}else{


	userNav =
	<>
	<NavDropdown.Item href="#" onClick ={logout}>Logout</NavDropdown.Item>
	{(userInfo.isAdmin == true) 
	?
	<>
	<NavDropdown.Divider />
	<NavDropdown.Item as = {NavLink} to="/myOrders">Users List</NavDropdown.Item>
	<NavDropdown.Item as = {NavLink} to="/myOrders">User Orders</NavDropdown.Item>
	</>

	:
	<NavDropdown.Item as = {NavLink} to="/myOrders">My Orders</NavDropdown.Item>

	}
	
	</>
	}


/*
	let userNav = (userInfo.userId == null) ? 
	<>
	<NavDropdown.Item href="/login">Login</NavDropdown.Item>
	<NavDropdown.Item as = {NavLink} to="/register">Register</NavDropdown.Item>
	</>

	:
	<>

	<NavDropdown.Item href="#" onClick ={logout}>Logout</NavDropdown.Item>
	<NavDropdown.Item as = {NavLink} to="/myOrders">My Orders</NavDropdown.Item>

	</>*/



	return (

		<Navbar  fixed="top" bg="light" expand="lg">
		  <Navbar.Brand as = {NavLink} to="/">KAIMONO</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link as = {NavLink} to="/">Home</Nav.Link>
		      <Nav.Link as = {NavLink} to="/products">All Products</Nav.Link>
		      <NavDropdown title="Account" id="basic-nav-dropdown">
		      {userNav}
		        
		      </NavDropdown>
		    </Nav>
		    <span inline>
		  		<span>{userInfo.firstName} {userInfo.lastName} </span>
		  		{(userInfo.isAdmin == true) ? null : <span className="parentCart"><Link as = {Link} to="/cart"><span id="cartItemCount">{cartItemCount}</span><img src={cartIco} id="cartIcon"/></Link></span> }
		  		
		    </span>
		  </Navbar.Collapse>
		</Navbar>


		)
}