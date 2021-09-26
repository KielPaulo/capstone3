import React, {useState, useEffect, useContext} from 'react';
import {CardDeck, Card, Container} from 'react-bootstrap';
import UserContext from './../UserContext';
import UserView from './../components/UserView';
import AdminView from './../components/AdminView';




export default function Products(){


	const {userInfo,setUserInfo} = useContext(UserContext);
	const {rootUrl} = useContext(UserContext);
	const token =  localStorage.getItem('token');
	const isAdmin =  localStorage.getItem('isAdmin');


	const [products, setProducts] = useState([]);

	const fetchProducts = ()=>{

		fetch(`${rootUrl}/api/products`)
		.then(result=>result.json())
		.then(result =>{

			setProducts(result);

		})

	}

	const fetchProductsAdmin = ()=>{

		fetch(`${rootUrl}/api/products/adminProductList`,{

			method: "GET",
			headers:{

				"Authorization" : `Bearer ${token}`
			}
		})
		.then(result=>result.json())
		.then(result =>{


			setProducts(result);

		})

	}

	useEffect(()=>{

		(isAdmin === "true") ? fetchProductsAdmin() : fetchProducts()

	}, [])


	return (
	
		

		<div className="text-center">

		{(isAdmin === "true")? <AdminView productData={products} fetchProductsAdmin={fetchProductsAdmin}/>: <UserView productData={products}/>}

		</div>



		);
}