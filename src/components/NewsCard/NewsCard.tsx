import { memo } from 'react';

import { News } from 'types/market';

import { PolkamarketsIconCircle } from 'assets/icons';

import Text from '../Text';

type NewsCardProps = News;

function NewsCard({
  source,
  title,
  description,
  url,
  imageUrl
}: NewsCardProps) {
  return (
    <article className="pm-c-news-card">
      <header className="pm-c-news-card__header">
        <PolkamarketsIconCircle />
        <Text
          as="p"
          scale="tiny"
          fontWeight="semibold"
          className="pm-c-news-card__source"
        >
          {source}
        </Text>
      </header>
      <div className="pm-c-news-card__content">
        <a
          className="pm-c-news-card__headline body bold width-full"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
        <a href={url} target="_blank" rel="noreferrer" className="width-full">
          <img
            className="pm-c-news-card__image"
            height={107}
            width="100%"
            src={imageUrl}
            alt=""
          />
        </a>
        <Text
          as="p"
          scale="tiny"
          fontWeight="semibold"
          className="pm-c-news-card__summary"
        >
          {description}
        </Text>
      </div>
      <footer className="pm-c-news-card__footer">
        <a
          className="pm-c-news-card__action tiny bold"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Read More
        </a>
      </footer>
    </article>
  );
}

export default memo(NewsCard);
