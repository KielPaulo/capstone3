import React, {useContext, useState} from 'react';
import UserContext from './../UserContext';
import {Card, Button,Container, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';



export default function Cart(){

	const {cartItemArr, setCartItemArr} = useContext(UserContext);
	const {removeCartToggle, setRemoveCartToggle} = useContext(UserContext);
	const {rootUrl} = useContext(UserContext);
	const {getCartItems} = useContext(UserContext);
	const token = localStorage.getItem('token');
	const [showAlert, setshowAlert] = useState(false);



		const removeFromCart = (pId)=>{

		fetch(`${rootUrl}/api/users/removeFromCart/${pId}`,{

			method: "PUT",
			headers:{

				"Authorization": `Bearer ${token}`
			}

		})
		.then(result=> result.json())
		.then(result=>{

			if(result.removedFromCart === true){

				setshowAlert(true);

				setTimeout(function(){ 

					setshowAlert(false);
					getCartItems();

				}, 1500);


			}else{


				alert('Something went wrong')
			}
			
		})

	}

	let cartTotalAmount =0;

	const k = cartItemArr.map(cartItem =>{

		let imgUrl="";

		if(cartItem._id.image !==""){

			imgUrl=`${rootUrl}/static/images/${cartItem._id.image}`

		}

		cartTotalAmount += cartItem.quantity*cartItem._id.price;


		return (

			<Card key={cartItem._id._id} className="m-3 w-25">
			<Alert variant="success" show={showAlert}>Removed from cart</Alert>
			  <Card.Img variant="top" src={imgUrl}/>
			  <Card.Body>
			    <Card.Title>{cartItem._id.name}</Card.Title>
			    <Card.Text>
			      Quantity: {cartItem.quantity} <br/><br/>
			      Description:<br/>{cartItem._id.description}
			    </Card.Text>
			    <Card.Text>
			      Price: ₱{cartItem._id.price.toLocaleString('en-US')}
			    </Card.Text>
			      <Card.Text>
			      Total: ₱{cartItem._id.price*cartItem.quantity.toLocaleString('en-US')}
			    </Card.Text>
			  </Card.Body>
			  <Card.Footer>

			  <Link to="/"> View</Link>
				  <Button className="btn btn-sm" onClick={()=>removeFromCart(cartItem._id._id)}> Remove from Cart</Button>
				     
			  </Card.Footer>
			</Card>

			)
	})


	function checkout(){


		console.log(cartItemArr);



	}

	

	return(


		<Container>
		<h2>My Cart</h2>
		{k}
		<div>Total Amount: ₱{cartTotalAmount.toLocaleString('en-US')}</div>
		<Button className="btn btn-warning" onClick={checkout}>Checkout</Button>
		</Container>


		)


}