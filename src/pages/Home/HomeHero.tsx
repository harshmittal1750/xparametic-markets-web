import { Link } from 'react-router-dom';

import { ui } from 'config';
import { Container, Hero } from 'ui';

import { Text } from 'components';

import HomeClasses from './Home.module.scss';

export default function HomeHero() {
  const { hero } = ui;

  return (
    <Container className={HomeClasses.header}>
      <Hero className="pm-p-home__hero" image={hero.image}>
        <div className="pm-p-home__hero__content">
          <div className="pm-p-home__hero__breadcrumb">
            {hero.header ? (
              <Text
                as="span"
                scale="tiny-uppercase"
                fontWeight="semibold"
                color="white-50"
              >
                {hero.header}
              </Text>
            ) : null}
          </div>
          {hero.title ? (
            <Text
              as="h2"
              fontWeight="bold"
              scale="heading-large"
              color="light"
              className="pm-p-home__hero__heading"
            >
              {hero.title}
            </Text>
          ) : null}
          {hero.action.title && hero.action.url ? (
            <Link
              className="pm-c-button-normal--primary pm-c-button--sm"
              to={hero.action.url}
            >
              {hero.action.title}
            </Link>
          ) : null}
        </div>
      </Hero>
    </Container>
  );
}
