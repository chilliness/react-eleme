import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Star from '../star';
import './index.scss';

@inject('store')
@observer
class index extends Component {
  state = {
    nav: [{ name: '/goods', text: '商品' }, { name: '/rating', text: '评价' }, { name: '/seller', text: '商家' }],
    isShow: false
  };

  componentDidMount() {
    this.handleInitScroll('scrollMark');
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
      },
      state: { nav, isShow }
    } = this;

    return (
      <div className="nav-wrap">
        <div className="header-bar">
          {seller.supports && (
            <>
              <div className="bg-box" style={{ backgroundImage: 'url(' + seller.avatar + ')' }} />
              <div className="top-box">
                <div className="img-box">
                  <img className="img" src={seller.avatar} alt="logo" />
                </div>
                <div className="intro-box">
                  <h2 className="item-box name">
                    <i className="icon" />
                    <span>{seller.name}</span>
                  </h2>
                  <div className="item-box delivery">{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}</div>
                  {seller.supports[0] && (
                    <div className="item-box activity">
                      <Icon type={seller.supports[0].type} />
                      <span>{seller.supports[0].description}</span>
                    </div>
                  )}
                </div>
                <div className="btn-more" onClick={() => this.setState({ isShow: true })}>
                  <span className="text">{seller.supports.length + '个'}</span>
                  <i className="iconfont icon-right-arrow" />
                </div>
              </div>
            </>
          )}
          <div className="bottom-box">
            <i className="icon" />
            {seller.bulletin && (
              <div className="text-bar">
                <div className="text-box">
                  <div className="text">{seller.bulletin}</div>
                  <div className="text">{seller.bulletin}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="nav-bar">
          {nav.map((item, index) => (
            <NavLink className="item-box" to={item.name} activeClassName="active" key={index}>
              {item.text}
            </NavLink>
          ))}
        </div>
        <div className={classNames('mark-box', { show: isShow })}>
          <div className="content-outer" ref="scrollMark">
            <div>
              <h3 className="name">{seller.name}</h3>
              <div className="star-bar">
                <Star score={seller.score} size={24} />
              </div>
              <div className="content-box">
                <div className="caption">
                  <i className="line" />
                  <span className="text">优惠信息</span>
                  <i className="line" />
                </div>
                <ul className="list-box">
                  {(seller.supports || []).map((item, index) => (
                    <li className="item-box" key={index}>
                      <Icon type={item.type} />
                      <span className="text">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="content-box">
                <div className="caption">
                  <i className="line" />
                  <span className="text">商家公告</span>
                  <i className="line" />
                </div>
                <p className="intro">{seller.bulletin}</p>
              </div>
            </div>
          </div>
          <i className="iconfont icon-close" onClick={() => this.setState({ isShow: false })} />
        </div>
      </div>
    );
  }
}

export default index;
