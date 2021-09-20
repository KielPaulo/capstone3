import Carousel from 'react-bootstrap/Carousel';
import image1 from "./../images/2.jpg";
import image2 from "./../images/many-interesting-kinds-of-goods-for-home-were-sold-in-daiso-shop-at-village-market-hua-hin-thailand-february-202020-2BG2PYJ.jpg";
import image3 from "./../images/Japanese-Shop.webp";
export default function Hero(){

	return(

		<Carousel>
		  <Carousel.Item>
		    <img
		      className="d-block w-75"
		      src="./images/2.jpg"
		      alt="First slide"
		    />
		    <Carousel.Caption>
		      <h3>First slide label</h3>
		      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-75"
		      src="./images/3.jpg"
		      alt="Second slide"
		    />

		    <Carousel.Caption>
		      <h3>Second slide label</h3>
		      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		  <Carousel.Item>
		    <img
		      className="d-block w-75"
		      src="./images/Japanese-Shop.webp"
		      alt="Third slide"
		    />

		    <Carousel.Caption>
		      <h3>Third slide label</h3>
		      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
		    </Carousel.Caption>
		  </Carousel.Item>
		</Carousel>



		)
}