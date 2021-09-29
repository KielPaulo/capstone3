import React, {useContext, useEffect} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import UserContext from './../UserContext'
import {useHistory, NavLink, Link} from 'react-router-dom'
import cartIco from "./../images/icons8-shopping-cart-64_2.png";


export default function Header(){

	const {userInfo, unsetUserInfo} = useContext(UserContext);
	/*const {rootUrl} = useContext(UserContext);*/
/*	const {addCartToggle} = useContext(UserContext);*/
	/*const {removeCartToggle, setRemoveCartToggle} = useContext(UserContext);*/
/*	const {cartItemArr, setCartItemArr} = useContext(UserContext);*/
	const {cartItemCount} = useContext(UserContext);
	const {getCartItems} = useContext(UserContext);
/*	const token =  localStorage.getItem('token');*/


	let history = useHistory();


	const logout =()=>{

		  unsetUserInfo();

		  history.push('/login')
	}


	useEffect(()=>{


		getCartItems();


	},[userInfo])


/*	let userNav;

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
	<NavDropdown.Item as = {NavLink} to="/userList">Users List</NavDropdown.Item>
	<NavDropdown.Item as = {NavLink} to="/userOrders">User Orders</NavDropdown.Item>
	</>

	:
	<NavDropdown.Item as = {NavLink} to="/myOrders">My Orders</NavDropdown.Item>

	}
	
	</>
	}
*/

	return (

		<Navbar  fixed="top" bg="white" expand="lg" className="myNav">
		  <Navbar.Brand className="text-danger"as = {NavLink} to="/">KAIMONO</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link as = {NavLink} to="/">Home</Nav.Link>

		      {(userInfo.userId == null) ? 

		      	<NavDropdown title="Account" id="basic-nav-dropdown">
		      	<NavDropdown.Item href="/login">Login</NavDropdown.Item>
		      	<NavDropdown.Item as = {NavLink} to="/register">Register</NavDropdown.Item>
		      	</NavDropdown>

		      	:

		      	(userInfo.isAdmin == true) ?

		      		<NavDropdown title="Admin Dashboard" id="basic-nav-dropdown">
		      		<NavDropdown.Item href="#" onClick ={logout}>Logout</NavDropdown.Item>
		      		<NavDropdown.Divider />
		      		<NavDropdown.Item as = {NavLink} to="/products">Manage Products</NavDropdown.Item>
		      		<NavDropdown.Item as = {NavLink} to="/userList">Users List</NavDropdown.Item>
		      		<NavDropdown.Item as = {NavLink} to="/userOrders">User Orders</NavDropdown.Item>
		      		</NavDropdown>

		      		:
		      		<>
		      		<Nav.Link as = {NavLink} to="/products">All Products</Nav.Link>
		      		<NavDropdown title="Account" id="basic-nav-dropdown">
		      		<NavDropdown.Item href="#" onClick ={logout}>Logout</NavDropdown.Item>
		      		<NavDropdown.Divider />
		      		<NavDropdown.Item as = {NavLink} to="/myOrders">My Orders</NavDropdown.Item>
		      		</NavDropdown>
		      		</>

		      }

		
		    </Nav>
		    <span inline>

		  		<span>{(userInfo.isAdmin == true) ? <strong>Admin</strong> : null} {userInfo.firstName} {userInfo.lastName} </span>
		  		{(userInfo.isAdmin == true) ? null : <span className="parentCart"><Link as = {Link} to="/cart"><span id="cartItemCount">{cartItemCount}</span><img src={cartIco} id="cartIcon"/></Link></span> }
		  		
		    </span>
		  </Navbar.Collapse>
		</Navbar>


		)
}