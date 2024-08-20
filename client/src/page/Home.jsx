import { useState, useEffect } from 'react';
import './css/Home.css';
import Hero_Img from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
import Banner1 from '../assets/w-banner.webp';
import Banner2 from '../assets/m-banner.webp';
import Banner3 from '../assets/a-banner.webp';
import Product from '../component/product/Product';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { text1: 'Men New Season', text2: 'JACKET & COATS' },
    { text1: 'Men Collections', text2: 'NEW ARRIVALS' },
    { text1: 'Women Collections', text2: 'NEW SEASON' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollClick = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

  return ( 
    <>
    {/* hero section start */}
      <div className='hero'>
        <div className='hero-background' style={{ backgroundImage: `url(${Hero_Img})` }}></div>
        <div className='hero-overlay'></div>
        <div className='hero-content'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`content-1 ${currentSlide === index ? 'active' : ''}`}
            >
              <p className={`text1 ${currentSlide === index ? 'fadeInUp' : ''}`}>{slide.text1}</p>
              <h1 className={`text2 ${currentSlide === index ? 'fadeInLeft' : ''}`}>{slide.text2}</h1>
              <Link to={'/shop'}>Shop Now</Link>
            </div>
          ))}
        </div>
      </div>
    {/* hero section end */}

{/* ............................................................................................. */}


    {/* banner start */}
    <div className="banner">
    <Link className="banner-content" onClick={scrollClick} style={{ backgroundImage: `url(${Banner1})` }} to={'/shop'}>
      <div className="overlay"></div>
      <h1>Women</h1>
      <p>spring 2024</p>
    </Link>

    <Link className="banner-content" onClick={scrollClick} style={{ backgroundImage: `url(${Banner2})` }} to={'/shop'}>
      <div className="overlay"></div>
      <h1>Men</h1>
      <p>spring 2024</p>
    </Link>

    <Link className="banner-content" onClick={scrollClick} style={{ backgroundImage: `url(${Banner3})` }} to={'/shop'}>
      <div className="overlay"></div>
      <h1>Accessories</h1>
      <p>New Trend</p>
    </Link>
  </div>

    {/* banner end */}

    {/* ---------------------------------------------------------------- */}

    {/* LATEST PRODUCT start */}
        <div className='latest-product'>
          <h1>LATEST PRODUCT</h1>
          <div className='latest-each-product'>
            <Product/>
          </div>
        </div>
    {/* LATEST PRODUCT end */}
    </>
  );
}
