import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoWrapperProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SeoWrapper: React.FC<SeoWrapperProps> = ({
  title = "Premium Plywood, Hardware & Interior Surfaces | ABHISHEK",
  description = "Explore a handpicked selection of premium finishes, designed to bring unmatched character and depth to your interiors. Quality plywood and hardware.",
  canonicalUrl = "https://www.abhishekplyandhardware.com/",
  ogImage = "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
