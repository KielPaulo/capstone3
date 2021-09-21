import React, {useContext, useState} from 'react';
import {Card, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserContext from './../UserContext'


export default function Product({productProp}){


	const{_id, name, description, price, image} = productProp;
	const token = localStorage.getItem('token');
	const {rootUrl} = useContext(UserContext);
	const {getCartItems} = useContext(UserContext);
	const {addCartToggle,setAddCartToggle} = useContext(UserContext);
	const [showAlert, setshowAlert] = useState(false);


	const addToCart = (pId)=>{


		fetch(`${rootUrl}/api/users/addToCart/${pId}`,{


			method: "PUT",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		})

		.then(result => result.json())
		.then(result=>{

			
			if(result){

				setshowAlert(true);
		
				getCartItems();

		/*	setAddCartToggle(prevState=> !prevState);*/

			setTimeout(function(){ setshowAlert(false); }, 1250);

			}else{

				console.log('Something went wrong');

			}

		})

	}


	let imgUrl="";

	if(image !==""){

		imgUrl=`${rootUrl}/static/images/${image}`

	}

	return (

	<Card key={_id} className="m-3 w-25">
	<Alert key={_id} variant="success" show={showAlert}>Added to Cart</Alert>
	  <Card.Img variant="top" src={imgUrl}/>
	  <Card.Body>
	    <Card.Title>{name}</Card.Title>
	    <Card.Text>
	      {description}
	    </Card.Text>
	    <Card.Text>
	      Php {price}
	    </Card.Text>
	  </Card.Body>
	  <Card.Footer>

	  <Link to="/"> View</Link>
		  <Button className="btn btn-sm" onClick={()=>addToCart(_id)}> Add to Cart</Button>
		 
	    
	  </Card.Footer>
	</Card>
	)



}