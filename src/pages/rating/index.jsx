import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { Star, Divide, Toggle } from '@/components';
import './index.scss';

@inject('store')
@observer
class index extends Component {
  state = {
    nowType: -1,
    isHasContent: false
  };

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

  handleToggle = (isHasContent, nowType) => {
    this.setState({ isHasContent, nowType });
  };

  render() {
    let {
      props: {
        store: { seller, ratings }
      },
      state: { nowType, isHasContent },
      handleToggle
    } = this;

    let obj = {
      nowType: nowType,
      isHasContent: isHasContent,
      list: [
        {
          text: '全部',
          type: -1,
          num: ratings.length
        },
        {
          text: '满意',
          type: 1,
          num: ratings.filter(item => item.rateType).length
        },
        {
          text: '不满意',
          type: 0,
          num: ratings.filter(item => !item.rateType).length
        }
      ]
    };

    let arr = ratings.filter(item => {
      if (nowType === -1) {
        return true;
      }
      return item.rateType === nowType;
    });

    let ratingList = isHasContent ? arr.filter(item => item.text) : arr;

    return (
      <div className="rating-wrap" ref="scroll">
        <div>
          <div className="rating-box">
            <div className="left-box">
              <div className="score">{seller.score}</div>
              <div className="text">综合评分</div>
              <div className="compare">{'高于周边商家' + seller.rankRate + '%'}</div>
            </div>
            <div className="right-box">
              <div className="item-box">
                <div className="text">服务态度</div>
                <div className="star-bar">
                  <Star score={seller.serviceScore} size={18} />
                </div>
              </div>
              <div className="item-box">
                <div className="text">就餐环境</div>
                <div className="star-bar">
                  <Star score={seller.foodScore} size={18} />
                </div>
              </div>
              <div className="item-box">
                <div className="text">送达时间</div>
                <div className="time">{seller.deliveryTime + '分钟'}</div>
              </div>
            </div>
          </div>
          <Divide />
          <div className="content-box">
            <Toggle data={obj} handleToggle={handleToggle} />
            <ul className="rating-list">
              {ratingList.map((item, index) => (
                <li className="item-box" key={index}>
                  <div className="img-box">
                    <img className="img" src={item.avatar} alt="头像" />
                  </div>
                  <div className="info-box">
                    <div className="name-bar">
                      <span className="name">{item.username}</span>
                      <span className="time">{item.rateTime}</span>
                    </div>
                    <div className="star-bar">
                      <Star score={item.score} size={10} />
                      <span className="delivery">{item.deliveryTime + '分钟送达'}</span>
                    </div>
                    {item.text && <p className="rating-bar">{item.text}</p>}
                    <div className="other-bar">
                      <i className={classNames(['iconfont', item.rateType ? 'icon-love' : 'icon-unlove'])} />
                      {item.recommend.length > 0 && (
                        <ul className="text-list">
                          {item.recommend.map((_item, _index) => (
                            <li className="text-box" key={_index}>
                              <div className="text">{_item}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
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
