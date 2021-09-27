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

		let shortenedDesc;


		let k = result.map(e=>{


			let imgUrl="";

			if(e.image !==""){

				imgUrl=`${rootUrl}/static/images/${e.image}`

			}

/*
			if(e.description.length > 90){

				shortenedDesc = e.description.slice(0,90) + {<Link to={/productView/${e._id}}...</Link>};

				

			}else{


				shortenedDesc = e.description;
			}
*/
			


			


		return (	 

			<Card key={e._id} className="mb-5 mr-2 featuredCard">
			  <Card.Img  src={imgUrl}/>
			  <Card.Body>
			    <Card.Title><Link to={`/productView/${e._id}`}>{e.name}</Link></Card.Title>
			    <Card.Text>
			      {e.description.length > 90 ?<>{e.description.slice(0,90)}...<Link to={`/productView/${e._id}`}> read more</Link></>: e.description}
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
	
	<p className="lead">Featured Products</p>

	<div className="d-inline-flex flex-wrap justify-content-center">
	{featuredArr}
	</div>


	</Container>
	)
}
