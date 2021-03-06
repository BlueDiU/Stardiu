import React from 'react';

/* Components */
import {
  MDBCarouselCaption,
  MDBCarouselElement,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

import PropTypes from 'prop-types';

function CarouselItem({ item, image, title, desc }) {
  return (
    <MDBCarouselItem
      itemId={item}
      className={`${item === 0 && 'active'}`}
    >
      <MDBCarouselElement
        style={{ borderRadius: '12px' }}
        src={image}
        alt={desc}
      />
      <MDBCarouselCaption>
        <h5>{title}</h5>
        <p>{desc}</p>
      </MDBCarouselCaption>
    </MDBCarouselItem>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.number,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default CarouselItem;
