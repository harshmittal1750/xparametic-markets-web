import { News } from 'types/market';

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
        <Text
          as="span"
          scale="body"
          fontWeight="bold"
          className="pm-c-news-card__headline"
        >
          {title}
        </Text>
        <img
          className="pm-c-news-card__image"
          width={241}
          height={107}
          src={imageUrl}
          alt=""
        />
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

export default NewsCard;
