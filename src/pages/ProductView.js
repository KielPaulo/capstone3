import React,{useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Card, Button, Alert} from 'react-bootstrap';
import UserContext from './../UserContext';


export default function ProductView(){

	const {productId} = useParams();
	const{rootUrl} = useContext(UserContext);
	const{addToCart} = useContext(UserContext);
	const [productData, setProductData] = useState('');
	const [qtyValue, setQtyValue] = useState(1);




	useEffect(()=>{

		fetch(`${rootUrl}/api/products/id/${productId}`)
		.then(result=> result.json())
		.then(result=>{

			setProductData(result);
		})


	},[])



	let imgUrl="";

	if(productData.image !==""){

		imgUrl=`${rootUrl}/static/images/${productData.image}`

	}


	return (

		<Card key={productData._id} className="m-3 w-50">
		  <Card.Img variant="top" src={imgUrl}/>
		  <Card.Body>
		    <Card.Title>{productData.name}</Card.Title>
		    <Card.Text>
		      {productData.description}
		    </Card.Text>
		    <Card.Text>
		      ₱{productData.price}
		    </Card.Text>
		  </Card.Body>
		  <Card.Footer>

		  	<div className="quantityCtrl">
		  	<button  onClick={()=>{(qtyValue > 1)? setQtyValue(qtyValue-1): setQtyValue(qtyValue)}}>-</button>
		  	<input type="text" value={qtyValue}/>
		  	<button onClick={()=>{setQtyValue(qtyValue+1)}}>+</button>
		  	</div>
			  <Button className="btn btn-sm" onClick={()=>addToCart(productData._id, qtyValue)}> Add to Cart</Button>
			 
		    
		  </Card.Footer>
		</Card>

		


		);
}