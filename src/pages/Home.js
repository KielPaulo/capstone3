import React, {useContext, useState, useEffect} from 'react';
import Hero from './../components/Hero';
import {Button, Container, Card, Spinner} from 'react-bootstrap';
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
/*
		let shortenedDesc;*/


		let k = result.map(e=>{


			let imgUrl="";

			if(e.image !==""){

				imgUrl=`${rootUrl}/static/images/${e.image}`

			}


		return (	 

			<Card key={e._id} className="mb-5 mr-2 featuredCard">
			  <Card.Img  src={imgUrl}/>
			  <Card.Body>
			    <Card.Title><Link className="text-danger" to={`/productView/${e._id}`}>{e.name}</Link></Card.Title>
			    <Card.Text className="lead">
			      {e.description.length > 250 ?<>{e.description.slice(0,250)}...<Link className="text-danger" to={`/productView/${e._id}`}> read full</Link></>: e.description}
			    </Card.Text>
			    <Card.Text>
			      <strong>₱{e.price.toLocaleString('en-US')}</strong>
			    </Card.Text>
			  </Card.Body>
			  <Card.Footer>

				  <Button className="btn btn-sm btn-danger" onClick={()=>addToCart(e._id)}> Add to Cart</Button>
				     
			  </Card.Footer>
			</Card>

	  )

	})

		setFeaturedArr(k);
		
	})


},[])







return(
	<Container>

	<marquee behavior="" direction="">Try Admin Login=> Email:tester@admin.com , Password: 1234 </marquee>

	<Hero/>
	<h4 className="text-danger"><em>Featured Products</em></h4>

	<div className="d-inline-flex flex-wrap justify-content-evenly">
	{featuredArr}
	</div>


	</Container>
	)
}
