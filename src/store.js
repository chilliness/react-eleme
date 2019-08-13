import { observable, action } from 'mobx';

class Store {
  @observable ratings = [];
  @observable seller = {};
  @observable goods = [];
  @observable isAnim = false;
  @observable cartList = [];

  @action
  $handleRatings(ratings) {
    this.ratings = ratings;
  }

  @action
  $handleSeller(seller) {
    this.seller = seller;
  }

  @action
  $handleGoods(goods) {
    this.goods = goods;
  }

  @action
  $handleIsAnim(bool) {
    this.isAnim = bool;
  }

  @action
  $handleCart(obj) {
    let list = [...this.cartList];
    let index = list.findIndex(item => item.id === obj.id);

    if (index === -1) {
      list.unshift(obj);
    } else {
      obj.cartNum > 0 ? list.splice(index, 1, obj) : list.splice(index, 1);
    }

    this.cartList = list;
  }

  @action
  $handleClear() {
    [...this.cartList].forEach(item => (item.cartNum = 0));
    this.cartList = [];
  }
}

export default new Store();
