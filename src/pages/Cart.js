import React, {useContext, useState} from 'react';
import UserContext from './../UserContext';
import {Card, Button,Container, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';




export default function Cart(){

	const {cartItemArr, setCartItemArr} = useContext(UserContext);
	const {removeCartToggle, setRemoveCartToggle} = useContext(UserContext);
	const {rootUrl} = useContext(UserContext);
	const {getCartItems} = useContext(UserContext);
	const token = localStorage.getItem('token');




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

				alertify.set('notifier','position', 'top-center');
				alertify.set('notifier','delay', 2)
				alertify.success('Removed from cart');

				setTimeout(()=>{

					getCartItems();


				}, 1500)


					


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
			  <Card.Img variant="top" src={imgUrl}/>
			  <Card.Body>
			    <Card.Title><Link to={`/productView/${cartItem._id._id}`}> {cartItem._id.name} </Link></Card.Title>
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

			
				  <Button className="btn btn-sm" onClick={()=>removeFromCart(cartItem._id._id)}> Remove from Cart</Button>
				     
			  </Card.Footer>
			</Card>

			)
	})


	function checkout(){


		//console.log(cartItemArr);

		const cartItemArrCK = cartItemArr.map(i =>{


			return {productId:i._id._id, quantity:i.quantity}
		

		})

		console.log(cartItemArrCK);


		fetch(`${rootUrl}/api/users/checkout`,{

			method: "POST",
			headers: {

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body:JSON.stringify({

			items: cartItemArrCK,
			totalAmt: cartTotalAmount

			})

		})
		.then(result=> result.json())
		.then(result =>{

			if(Object.keys(result).length === 0){

				alert('Something went wrong');

			}else{

				Swal.fire(
				  'Orders placed successfully',
				  'Check your orders at "My Orders"',
				  'success'
				)

				fetch(`${rootUrl}/api/users/clearCart`,{

					method: "PUT",
					headers:{

						"Authorization":`Bearer ${token}`
					}
				}).then(result => result.json())
				.then(result=>{

					if(result.cartCleared !== true){

						alert('Cannot clear cart. Something went wrong');

					}


					setTimeout(function(){ 

						getCartItems();

					}, 1500);

					
				})

			}

		})

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