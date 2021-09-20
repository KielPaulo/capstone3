import React, {useState, useEffect} from 'react';
import {Card, CardDeck} from 'react-bootstrap';
import Product from './Product';


export default function UserView({productData}){

	console.log('User View');


	const [products, setProducts] = useState([])

	useEffect(()=>{

		const productArr =  productData.map(product=>{

			return <Product key={product._id} productProp={product}/>

		})


		setProducts(productArr);



	},[productData])




	return (

		<CardDeck>

		{products}

		</CardDeck>


		)
}
