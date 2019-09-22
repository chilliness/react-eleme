import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

@observer
class index extends Component {
  static propTypes = {
    size: PropTypes.number,
    score: PropTypes.number,
    count: PropTypes.number
  };

  static defaultProps = {
    size: 6,
    score: 5,
    count: 5
  };

  handleCount = () => {
    return Array(this.props.count).fill('');
  };

  render() {
    let {
      props: { size, score },
      handleCount
    } = this;

    return (
      <ul className="star-wrap">
        {handleCount().map((item, index) => (
          <li className={classNames(['star-item', 'star-item-' + size, index < score ? 'on' : ''])} key={index} />
        ))}
      </ul>
    );
  }
}

export default index;
