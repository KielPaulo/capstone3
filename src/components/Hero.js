import {Carousel, Container, Row, Col, Card, Button} from 'react-bootstrap';
import image1 from "./../images/2.jpg";
import image2 from "./../images/many-interesting-kinds-of-goods-for-home-were-sold-in-daiso-shop-at-village-market-hua-hin-thailand-february-202020-2BG2PYJ.jpg";
import image3 from "./../images/Japanese-Shop.webp";
export default function Hero(){

	return(
		<Row className="g-0 mb-5 hero">
		<Col className="col-12 col-md-9 p-0">
		<Carousel className="heroCarousel mr-1" variant="dark">
		  <Carousel.Item>
		    <img
		      className="d-block w-100 "
		      src="./images/2.jpg"
		      alt="First slide"
		    />
		    <Carousel.Caption>
		      <h3>Missing Japanese products?</h3>
		      <p>Japanese made products made available to the Philippines!</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-100 "
		      src="./images/d6d5404bb59089ce5df218b5713a711f.jpg"
		      alt="Second slide"
		    />

		    <Carousel.Caption>
		      <h3>At your Convenience</h3>
		      <p>Quality items and food products from Japan, ready to be ordered and delivered right at your doors.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src="./images/Japanese-Shop.webp"
		      alt="Third slide"
		    />

		    <Carousel.Caption>
		      <h3>Cheap prices</h3>
		      <p>Afforable prices! Stocks are regularly updated.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		</Carousel>
		</Col>

		<Col className="col-12 col-md-3 p-0 rightCard">
		<Card className="h-100">
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

		)
}