import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

Index.propTypes = {
  size: PropTypes.number,
  score: PropTypes.number,
  count: PropTypes.number
};

Index.defaultProps = {
  size: 6,
  score: 5,
  count: 5
};

export default function Index({ size, score, count }) {
  return (
    <ul className="star-wrap">
      {Array.from(Array(count).keys()).map((item, index) => (
        <li className={classNames(['star-item', 'star-item-' + size, index < score ? 'on' : ''])} key={index} />
      ))}
    </ul>
  );
}
