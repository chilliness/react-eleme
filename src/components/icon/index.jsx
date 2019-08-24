import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

Index.propTypes = {
  type: PropTypes.number,
  size: PropTypes.bool
};

Index.defaultProps = {
  type: 0,
  size: false
};

export default function Index({ type, size }) {
  let handleType = useCallback(() => {
    let str = '';
    switch (type) {
      case 1:
        str = 'discount';
        break;

      case 2:
        str = 'special';
        break;

      case 3:
        str = 'invoice';
        break;

      case 4:
        str = 'guarantee';
        break;

      default:
        str = 'decrease';
    }

    return `icon-${str}`;
  }, [type]);

  return <span className={classNames(['icon-wrap', handleType(), size ? 'small' : ''])} />;
}
