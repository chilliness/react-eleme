import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import Btn from '../btn';
import './index.scss';

@inject('store')
@observer
class index extends Component {
  state = {
    isShow: false
  };

  static getDerivedStateFromProps(nextProps) {
    let list = nextProps.store.cartList;
    let num = 0;
    list.forEach(item => (num += item.cartNum));

    if (num < 1) {
      return { isShow: false };
    }
    return null;
  }

  componentDidMount() {
    this.handleInitScroll('scroll');
  }

  handleInitScroll = (ref, config = { scrollY: true, click: true }) => {
    if (!this[ref]) {
      this[ref] = new this.$BScroll(this.refs[ref], config);
    } else {
      this[ref].refresh();
    }
  };

  handleToggle = () => {
    let list = this.props.store.cartList;
    let num = 0;
    list.forEach(item => (num += item.cartNum));

    if (num > 0) {
      this.setState({ isShow: !this.state.isShow });
    }
  };

  handleClear = () => {
    this.props.store.$handleClear();
  };

  render() {
    let {
      props: {
        store: { cartList, isAnim }
      },
      state: { isShow },
      handleToggle,
      handleClear
    } = this;

    let list = cartList;
    let num = 0;
    let payment = 0;
    list.forEach(item => {
      num += item.cartNum;
      payment += item.cartNum * item.price;
    });
    let cart = { num, list, payment };

    return (
      <div className="cart-wrap">
        <div className="normal-box">
          <div className="icon-box" onClick={handleToggle}>
            {cart.num > 0 && <span className="num">{cart.num}</span>}
            <div className="bg-box">
              <i className={classNames('iconfont', 'icon-cart', { anim: isAnim })} />
            </div>
          </div>
          <div className="price-box">
            <span className="price">{'￥' + cart.payment}</span>
            <span className="delivery">另需配送费￥4元</span>
          </div>
          {20 - cart.payment > 0 ? <div className="btn-buy">{'还差￥' + (20 - cart.payment) + '元起送'}</div> : <div className="btn-buy active">{'需支付￥' + (4 + cart.payment) + '元'}</div>}
        </div>
        <div className={classNames('cart-outer', { show: isShow })}>
          <div className="holder" onClick={handleToggle} />
          <div className="cart-box">
            <div className="btn-bar">
              <span className="btn btn-cancel">购物车</span>
              <span className="btn btn-clear" onClick={handleClear}>
                清空
              </span>
            </div>
            <div className="list-outer" ref="scroll">
              <ul className="list-box">
                {cart.list.map((item, index) => (
                  <li className="item-box" key={index}>
                    <span className="text">{item.name}</span>
                    <div className="price-bar">
                      <span className="price">{'￥' + item.price}</span>
                      <Btn food={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
