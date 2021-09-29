import React, {useContext, useState} from 'react';
import {Card, Button, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserContext from './../UserContext'



export default function Product({productProp}){


	const{_id, name, description, price, image} = productProp;
	/*const token = localStorage.getItem('token');*/
	const {rootUrl} = useContext(UserContext);
	const {addToCart} = useContext(UserContext);
/*	const {getCartItems} = useContext(UserContext);*/

	const [qtyValue, setQtyValue] = useState(1);

	let imgUrl="";

	if(image !==""){

		imgUrl=`${rootUrl}/static/images/${image}`

	}

	return (

	

	<Card key={_id} className="mb-5 mr-2 featuredCard">
	
	  <Card.Img variant="top" src={imgUrl}/>
	  <Card.Body>
	    <Card.Title> <Link className ="text-danger" to={`/productView/${_id}`}>{name}</Link></Card.Title>
	    <Card.Text>
	      {description.length > 250 ?<>{description.slice(0,250)}...<Link className ="text-danger" to={`/productView/${_id}`}> read more</Link></>: description}
	    </Card.Text>
	    <Card.Text>
	      <strong>₱{price.toLocaleString('en-US')}</strong>
	    </Card.Text>
	  </Card.Body>
	  <Card.Footer>
	  		<div className="quantityCtrl">
	  		<button  onClick={()=>{(qtyValue > 1)? setQtyValue(qtyValue-1): setQtyValue(qtyValue)}}>-</button>
	  		<input type="text" value={qtyValue}/>
	  		<button onClick={()=>{setQtyValue(qtyValue+1)}}>+</button>
	  		</div>

		  <Button className="btn btn-sm btn-danger" onClick={()=>addToCart(_id, qtyValue)}> Add to Cart</Button>
	 
	    
	  </Card.Footer>


	</Card>
	)



}