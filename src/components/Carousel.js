import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselApp = () => (
    <Carousel>
    <Carousel.Item>
        <img
            className="d-block w-100 carousel__img"
            src="https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/07/03201757/Ciudades-mas-caras-de-America-Latina-Buenos-Aires.jpg"
            alt="Buenos Aires"
        />
        <Carousel.Caption>
            <h3>Buenos Aires</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        <img
            className="d-block w-100 carousel__img"
            src="https://venezolanosemigrantesenargentina.files.wordpress.com/2017/02/mendoza.jpg?w=1400"
            alt="Mendoza"
        />
        <Carousel.Caption>
            <h3>Mendoza</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        <img
            className="d-block w-100 carousel__img"
            src="http://www.misiones.tur.ar/images/bg-iguazu-home.png"
            alt="Misiones"
        />
        <Carousel.Caption>
            <h3>Misiones</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
);

export default CarouselApp;