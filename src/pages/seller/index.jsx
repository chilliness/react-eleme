import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { Star, Divide, Icon } from '@/components';
import './index.scss';

@inject('store')
@observer
class index extends Component {
  componentDidMount() {
    this.handleInitScroll('scroll');
    this.handleInitScroll('scrollX', { scrollX: true });
  }

  handleInitScroll = (ref, config = { scrollY: true, click: true }) => {
    if (!this[ref]) {
      this[ref] = new this.$BScroll(this.refs[ref], config);
    } else {
      this[ref].refresh();
    }
  };

  render() {
    let {
      props: {
        store: { seller }
      }
    } = this;

    return (
      <div className="seller-wrap" ref="scroll">
        <div>
          <div className="seller-box">
            <div className="top-box">
              <h2 className="name">{seller.name}</h2>
              <div className="plus-box">
                <div className="star-bar">
                  <Star size={18} score={seller.score} />
                </div>
                <span className="text">({seller.ratingCount})</span>
                <span className="text">{'月售' + seller.sellCount + '单'}</span>
              </div>
              <div className="collect-box" onClick={() => (seller.isCollect = !seller.isCollect)}>
                <i className={classNames('iconfont', 'icon-collect', { active: seller.isCollect })} />
                <span className="text">{!seller.isCollect ? '收藏' : '取消'}</span>
              </div>
            </div>
            <ul className="bottom-box">
              <li className="item-box">
                <div className="text">起送价</div>
                <div className="num-box">
                  <span className="num">{seller.minPrice}</span>
                  <span>元</span>
                </div>
              </li>
              <li className="item-box">
                <div className="text">商家配送</div>
                <div className="num-box">
                  <span className="num">{seller.deliveryPrice}</span>
                  <span>元</span>
                </div>
              </li>
              <li className="item-box">
                <div className="text">平均配送时间</div>
                <div className="num-box">
                  <span className="num">{seller.deliveryTime}</span>
                  <span>元</span>
                </div>
              </li>
            </ul>
          </div>
          <Divide />
          <div className="content-box">
            <h3 className="caption">公告与互动</h3>
            <p className="intro">{seller.bulletin}</p>
            <ul className="list-box">
              {(seller.supports || []).map((item, index) => (
                <li className="item-box" key={index}>
                  <Icon type={item.type} />
                  <span className="text">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <Divide />
          <div className="content-box">
            <h3 className="caption">商家实景</h3>
            <div className="pic-bar" ref="scrollX">
              <ul className="pic-list">
                {(seller.pics || []).map((item, index) => (
                  <li className="item-box" key={index}>
                    <img className="img" src={item} alt="图片" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Divide />
          <div className="content-box">
            <h3 className="caption">商家信息</h3>
            <ul className="list-box">
              {(seller.infos || []).map((item, index) => (
                <li className="item-box" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
