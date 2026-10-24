import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, type, image, schema, noindex = false }) {
  const siteUrl = 'https://snortwebtechnology.com';
  let fullUrl = `${siteUrl}/`;

  if (canonical) {
    if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
      fullUrl = canonical;
    } else {
      const cleanPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
      fullUrl = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
    }
  }

  const imageUrl = image || `${siteUrl}/og-image.png`;
  const robotsDirective = noindex ? 'noindex, nofollow' : 'index, follow';
  
  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsDirective} />
      {!noindex && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
