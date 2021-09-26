import React, {useState, useEffect} from 'react';
import {Card, CardDeck, Spinner} from 'react-bootstrap';
import Product from './Product';


export default function UserView({productData}){

	
	const [products, setProducts] = useState([])

	useEffect(()=>{

		const productArr =  productData.map(product=>{

			return <Product key={product._id} productProp={product}/>

		})


		setProducts(productArr);



	},[productData])


	console.log(products);




	return (

		<>
		{/*products lang dati*/}
		{(products.length === 0)? <Spinner animation="border" />: products}

		</>

		)
}
