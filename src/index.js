import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import axios from 'axios';
import BScroll from 'better-scroll';
import api from './utils/api';
import store from './store';
import App from './App';
import { Toast } from '@/components';
import './common/scss/index.scss';

axios.interceptors.response.use(res => res.data);
React.Component.prototype.$http = axios;
React.Component.prototype.$BScroll = BScroll;
React.Component.prototype.$api = api;
React.Component.prototype.$toast = Toast.$toast;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
