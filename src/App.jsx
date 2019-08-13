import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, KeepAlive } from 'react-keep-alive';
import { observer, inject } from 'mobx-react';
import { Goods, Rating, Seller } from './pages';
import { Nav, Cart, Loading } from './components';

@inject('store')
@observer
class App extends Component {
  state = {
    isAjax: false,
    isLoading: true
  };

  componentDidMount() {
    this.handleFetchData();
  }

  handleFetchData = async () => {
    if (this.state.isAjax) {
      return;
    }

    try {
      this.setState({ isAjax: true });
      let res = await this.$http({ url: this.$api.list });
      this.setState({ isAjax: false });

      if (res.code === 200) {
        this.setState({ isLoading: false });
        this.props.store.$handleRatings(res.data.ratings);
        this.props.store.$handleSeller(res.data.seller);
        this.props.store.$handleGoods(res.data.goods);
      } else {
        this.$toast({ msg: this.$api.msg });
      }
    } catch (e) {
      this.setState({ isAjax: false });
      this.$toast({ msg: this.$api.msg });
    }
  };

  render() {
    let {
      state: { isLoading }
    } = this;

    return (
      <Router>
        <Provider include="goods">
          <Nav />
          <Switch>
            <Redirect from="/" to="/goods" exact />
            <Route path="/goods">
              <KeepAlive name="goods">
                <Goods />
              </KeepAlive>
            </Route>
            <Route path="/rating" component={Rating} />
            <Route path="/seller" component={Seller} />
            <Redirect to="/goods" />
          </Switch>
          <Cart />
          {isLoading && <Loading />}
        </Provider>
      </Router>
    );
  }
}

export default App;
