import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title; // Force update for SPA navigation
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;