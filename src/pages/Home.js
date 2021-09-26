import React, {useContext, useState, useEffect} from 'react';
import Hero from './../components/Hero';
import {Form, Button, Container, Card, Row, Col, CardDeck, Spinner} from 'react-bootstrap';
import UserContext from './../UserContext';
import {Link} from 'react-router-dom'



export default function Home(){

	const {rootUrl} = useContext(UserContext);
	const {addToCart} = useContext(UserContext);
	const [featuredArr, setFeaturedArr] = useState(<Spinner animation="border"/>);//[] prev value


useEffect(()=>{


	fetch(`${rootUrl}/api/products/featuredProducts`)
	.then(result=> result.json())
	.then(result=>{


		let k = result.map(e=>{


			let imgUrl="";

			if(e.image !==""){

				imgUrl=`${rootUrl}/static/images/${e.image}`

			}


		return (	 

			<Card key={e._id} className="m-1">
			  <Card.Img variant="top" src={imgUrl} className="w-100 h-50"/>
			  <Card.Body>
			    <Card.Title><Link to={`/productView/${e._id}`}>{e.name}</Link></Card.Title>
			    <Card.Text>
			      {e.description}
			    </Card.Text>
			    <Card.Text>
			      ₱{e.price}
			    </Card.Text>
			  </Card.Body>
			  <Card.Footer>

				  <Button className="btn btn-sm" onClick={()=>addToCart(e._id)}> Add to Cart</Button>
				     
			  </Card.Footer>
			</Card>

	  )

	})

		setFeaturedArr(k);
		
	})


},[])







return(
	<Container>


	<Hero/>
	
	<h5 className="lead">Featured Products</h5>

	<div>

	<CardDeck >
	

	{featuredArr}

	</CardDeck>
	</div>


	</Container>
	)
}
