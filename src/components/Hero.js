import {Carousel, Row, Col, Card, Button} from 'react-bootstrap';

export default function Hero(){

	return(
		<Row className="g-0 mb-5 hero w-100">
		<Col className="col-12 p-0">
		<Carousel className="heroCarousel" variant="dark">
		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src="./images/2.jpg"
		      alt="First slide"
		    />
		    <Carousel.Caption>
		      <h3>Welcome to Kaimono!</h3>
		      <p>Japanese made products made available to the Philippines!</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-100 "
		      src="./images/Daiso+Japan+++www.thetravelpockets.jpg"
		      alt="Second slide"
		    />

		    <Carousel.Caption>
		      <h3>At your Convenience</h3>
		      <p>Ready to be ordered and delivered right at your doors.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src="./images/weird.jpg"
		      alt="Third slide"
		    />

		    <Carousel.Caption>
		      <h3>Cheap prices</h3>
		      <p>Afforable prices! Stocks are regularly updated.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		</Carousel>
		</Col>

{/*		<Col className="col-md-3 p-0 rightCard">
		<Card className="h-100">
		  <Card.Img className="img-fluid" src="./images/1_26-9LsrVdDNt-JnyqJscJw.jpeg" />
		  <Card.Body>
		    <Card.Title>Food Products</Card.Title>
		    <Card.Text>
		     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
		    </Card.Text>
	
		  </Card.Body>
		</Card>
		</Col>*/}
		</Row>

		)
}