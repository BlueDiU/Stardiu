import React from 'react';

/* assets */
import HERO_IMAGE from '../../../assets/img/hero.svg';

/* Components */
import HeroImageContainer from './HeroImageContainer';
import HeroTitle from './HeroTitle';
import HeroWrapper from './HeroWrapper';

function Hero() {
  /* bg-image */
  return (
    <section
      className="p-5 text-center hero-bg bg-image"
      style={{
        backgroundImage: `url("${HERO_IMAGE}")`,
        height: 640,
      }}
    >
      <HeroWrapper>
        <HeroImageContainer />
        <HeroTitle />
      </HeroWrapper>
    </section>
  );
}

export default Hero;
