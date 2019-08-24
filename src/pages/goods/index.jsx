import React, { Component } from 'react';
import { bindLifecycle } from 'react-keep-alive';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { Icon, Divide, Btn, Toggle } from '@/components';
import './index.scss';

@bindLifecycle
@inject('store')
@observer
class index extends Component {
  state = {
    food: { ratings: [] },
    nowIndex: 0,
    nowType: -1,
    isHasContent: false
  };

  componentDidActivate() {
    this.handleInitScroll('scrollLeft');
    this.handleInitScroll('scrollRight');
    this.handleInitScroll('scrollFood');
  }

  handleInitScroll = (ref, config = { scrollY: true, click: true, probeType: 3 }) => {
    if (!this[ref]) {
      this[ref] = new this.$BScroll(this.refs[ref], config);

      if (ref === 'scrollRight') {
        let arr = [];

        this[ref].on('scroll', pos => {
          if (!arr.length) {
            [...this.refs.listBox.children].forEach(item => arr.push(-item.offsetTop));
            arr.push(-Infinity);
          }

          // 性能优化
          let nowIndex = Math.max(0, arr.findIndex(item => item < pos.y) - 1);
          if (nowIndex !== this.state.nowIndex) {
            this.setState({ nowIndex });
          }
        });
      }
    } else {
      this[ref].refresh();
    }
  };

  handleShowFood = food => {
    this.setState({
      food: { ...food, isShow: true },
      nowType: -1,
      isHasContent: false
    });
    this.scrollFood && this.scrollFood.scrollTo(0, 0, 0);
  };

  handleHideFood = food => {
    this.setState({ food: { ...food, isShow: false } });
  };

  handleSelect = index => {
    let item = this.refs.listBox.children[index];
    if (item && this.scrollRight) {
      this.scrollRight.scrollToElement(item, 300);
    }
  };

  handleToggle = (isHasContent, nowType) => {
    this.setState({ isHasContent, nowType });
  };

  render() {
    let {
      props: {
        store: { goods }
      },
      state: { food, nowIndex, nowType, isHasContent },
      handleShowFood,
      handleHideFood,
      handleSelect,
      handleToggle
    } = this;

    let obj = {
      nowType: nowType,
      isHasContent: isHasContent,
      list: [
        {
          text: '全部',
          type: -1,
          num: food.ratings.length
        },
        {
          text: '满意',
          type: 1,
          num: food.ratings.filter(item => item.rateType).length
        },
        {
          text: '不满意',
          type: 0,
          num: food.ratings.filter(item => !item.rateType).length
        }
      ]
    };

    let arr = food.ratings.filter(item => {
      if (nowType === -1) {
        return true;
      }
      return item.rateType === nowType;
    });

    let ratingList = isHasContent ? arr.filter(item => item.text) : arr;

    return (
      <div className="goods-wrap">
        <div className="left-content" ref="scrollLeft">
          <ul className="list-box">
            {goods.map((item, index) => (
              <li className={classNames('item-box', { active: nowIndex === index })} key={index} onClick={handleSelect.bind(this, index)}>
                <div className="text-box">
                  {item.type > -1 && <Icon type={item.type} size />}
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-content" ref="scrollRight">
          <div className="list-box" ref="listBox">
            {goods.map((item, index) => (
              <div className="item-box" key={index}>
                <h3 className="caption">{item.name}</h3>
                <ul className="_list-box">
                  {item.foods.map((_item, _index) => (
                    <li className="_item-box" key={_index} onClick={() => handleShowFood(_item)}>
                      <div className="img-box">
                        <img className="img" src={_item.icon} alt="图片" />
                      </div>
                      <div className="info-box">
                        <h4 className="title">{_item.name}</h4>
                        {_item.description && <div className="desc">{_item.description}</div>}
                        <div className="sale">
                          <span className="text">{'月售卖' + _item.sellCount + '份'}</span>
                          <span className="text">{'好评率' + _item.rating + '%'}</span>
                        </div>
                        <div className="price">
                          <span className="text now">
                            <span>￥</span>
                            <span className="num">{_item.price}</span>
                          </span>
                          {_item.oldPrice && <span className="text old">{'￥' + _item.oldPrice}</span>}
                        </div>
                      </div>
                      <div className="btn-bar">
                        <Btn food={_item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={classNames('food-mark', { show: food.isShow })} ref="scrollFood">
          <div>
            {food.image && (
              <div className="pic-box" style={{ backgroundImage: 'url(' + food.image + ')' }}>
                <i className="iconfont icon-left-arrow" onClick={() => handleHideFood(food)} />
              </div>
            )}
            <div className="name-box">
              <h2 className="name">{food.name}</h2>
              <div className="sale">
                <span className="text">{'月售卖' + food.sellCount + '份'}</span>
                <span className="text">{'好评率' + food.rating + '%'}</span>
              </div>
              <div className="price">
                <span className="text now">
                  <span>￥</span>
                  <span className="num">{food.price}</span>
                </span>
                {food.oldPrice && <span className="text old">{'￥' + food.oldPrice}</span>}
              </div>
              <div className="btn-bar">
                <Btn food={food} />
              </div>
            </div>
            <Divide />
            <div className="content-box">
              <h3 className="caption">商品介绍</h3>
              <p className="intro">{food.info || '这个家伙很懒，什么都没留下'}</p>
            </div>
            <Divide />
            <div className="content-box">
              <Toggle data={obj} handleToggle={handleToggle} />
              <ul className="rating-list">
                {ratingList.map((item, index) => (
                  <li className="item-box" key={index}>
                    <div className="name-bar">
                      <span className="time">{item.rateTime}</span>
                      <div className="right-box">
                        <span className="name">{item.username}</span>
                        <div className="img-box">
                          <img className="img" src={item.avatar} alt="头像" />
                        </div>
                      </div>
                    </div>
                    <div className="text-bar">
                      <i className={classNames(['iconfont', item.rateType ? 'icon-love' : 'icon-unlove'])} />
                      <p className="text">{item.text}</p>
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
