import React from 'react';
import Slider from 'react-slick';
const FanArt = props => {
  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='slider'>
      <Slider {...settings}>
        {props.imgs.map((img, i) => {
          return (
            <div key={i}>
              <img className='slider-img' src={img} alt={'Fan Art'} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default FanArt;
