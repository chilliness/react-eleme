import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import './index.scss';

@inject('store')
@observer
class index extends Component {
  static propTypes = {
    food: PropTypes.object
  };

  static defaultProps = {
    food: {}
  };

  state = { isAjax: false };

  handleCart = (e, food, num) => {
    e.stopPropagation();

    if (this.state.isAjax) {
      return;
    }

    this.setState({ isAjax: true });

    // 此处处理传递过来的数据和store中的数据，用于同步数据
    let { goods } = this.props.store;
    outer: for (let i = 0; i < goods.length; i++) {
      let { foods } = goods[i];
      for (let j = 0; j < foods.length; j++) {
        if (foods[j].id === food.id) {
          foods[j].cartNum = food.cartNum += num;
          this.props.store.$handleCart(foods[j]);
          break outer;
        }
      }
    }

    // 保证添加购物车动画的顺利执行
    num > 0 && (this.props.store.isAnim = true);
    this.timerOut = setTimeout(() => {
      clearTimeout(this.timerOut);
      this.props.store.isAnim = false;
      this.setState({ isAjax: false });
    }, 200);
  };

  render() {
    let {
      props: { food },
      handleCart
    } = this;

    return (
      <div className="btn-wrap">
        {!food.cartNum ? (
          <div className="btn-handle" onClick={e => handleCart(e, food, 1)}>
            加入购物车
          </div>
        ) : (
          <div className="btn-box">
            <i className="iconfont icon-reduce" onClick={e => handleCart(e, food, -1)} />
            <span className="num">{food.cartNum}</span>
            <i className="iconfont icon-add" onClick={e => handleCart(e, food, 1)} />
          </div>
        )}
      </div>
    );
  }
}

export default index;
