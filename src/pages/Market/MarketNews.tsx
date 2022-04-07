import { News } from 'types/market';

import { NewsCard } from 'components';

type MarketNewsProps = {
  news: News[];
};

function MarketNews({ news }: MarketNewsProps) {
  return (
    <div className="pm-p-market-news">
      <ul className="pm-p-market-news__list">
        {news
          .slice(0, 9)
          .map(({ source, title, description, url, imageUrl }) => (
            <li key={`${source} - ${title}`} className="pm-p-market-news__item">
              <NewsCard
                source={source}
                title={title}
                description={description}
                url={url}
                imageUrl={imageUrl}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MarketNews;
