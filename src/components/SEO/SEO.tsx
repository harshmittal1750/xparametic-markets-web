import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  banner?: string;
};

function SEO({
  title = 'Polkamarkets - Autonomous Prediction Market Protocol',
  description = 'Polkamarkets is a DeFi-Powered Prediction Market built for cross-chain information exchange, based on Polkadot.',
  banner = `${process.env.PUBLIC_URL}/polkamarkets_meta.jpg`
}: SEOProps) {
  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: 'en' }}
      meta={[
        {
          name: 'description',
          content: description
        },
        {
          name: 'image',
          content: banner
        },
        {
          property: 'og:url',
          content: 'https://app.polkamarkets.com'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:image',
          content: banner
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:title',
          content: title
        },
        {
          property: 'twitter:description',
          content: description
        },
        {
          property: 'twitter:image',
          content: banner
        }
      ]}
    />
  );
}

export default SEO;
