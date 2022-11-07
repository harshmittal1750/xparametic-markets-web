import { Helmet } from 'react-helmet';

type SEOProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

const POLKAMARKETS_DEFAULT_BANNER = `${process.env.PUBLIC_URL}/polkamarkets_meta.jpg`;

function SEO({ title, description, imageUrl }: SEOProps) {
  const image = imageUrl || POLKAMARKETS_DEFAULT_BANNER;

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
          content: image
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
          content: image
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
          content: image
        }
      ]}
    />
  );
}

export default SEO;
