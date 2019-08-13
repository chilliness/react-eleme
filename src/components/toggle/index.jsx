import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

Index.propType = {
  data: PropTypes.object,
  handleToggle: PropTypes.func
};

Index.defaultProps = {
  data: {
    nowType: -1,
    isHasContent: false,
    list: [{ text: '全部', type: -1, num: 0 }, { text: '满意', type: 1, num: 0 }, { text: '不满意', type: 0, num: 0 }]
  },
  handleToggle: () => {}
};

export default function Index({ data, handleToggle }) {
  return (
    <div className="toggle-wrap">
      <h3 className="caption">商品评价</h3>
      <ul className="btn-list">
        {data.list.map((item, index) => (
          <li className={classNames('item-box', { active: item.type === data.nowType })} key={index} onClick={() => handleToggle(data.isHasContent, item.type)}>
            <span className="text">{item.text}</span>
            <span>{item.num}</span>
          </li>
        ))}
      </ul>
      <div className="choose-outer">
        <div className="choose-box" onClick={() => handleToggle(!data.isHasContent, data.nowType)}>
          <i className={classNames('iconfont', 'icon-checked', { active: data.isHasContent })} />
          <span>只看有内容的评价</span>
        </div>
      </div>
    </div>
  );
}
