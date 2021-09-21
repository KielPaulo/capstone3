import React from 'react';
import Hero from './../components/Hero';
import {Form, Button, Container, Card, Row, Col} from 'react-bootstrap';



export default function Home(){



return(
	<Container fluid>
	<Row className="g-0">
	<Col className="col-9 p-0">
	<Hero/>
	</Col>
	<Col className="col-3 p-0">
	<Card >
	  <Card.Img variant="top" src="./images/1_26-9LsrVdDNt-JnyqJscJw.jpeg" />
	  <Card.Body>
	    <Card.Title>Food Products</Card.Title>
	    <Card.Text>
	      Some quick example text to build on the card title and make up the bulk of
	      the card's content.
	    </Card.Text>
	    <Button variant="primary">Go somewhere</Button>
	  </Card.Body>
	</Card>
	</Col>
	</Row>
	<h1>Featured Products</h1>
	</Container>
	)
}
