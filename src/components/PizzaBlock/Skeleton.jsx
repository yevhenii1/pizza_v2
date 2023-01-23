import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="125" r="120" />
    <rect x="0" y="259" rx="5" ry="5" width="280" height="27" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="421" rx="11" ry="11" width="90" height="27" />
    <rect x="123" y="409" rx="0" ry="0" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
