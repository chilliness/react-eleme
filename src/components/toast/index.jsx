import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default {
  $toast({ msg = '', callback = () => {}, duration = 1500 }) {
    if (this.dom) {
      return;
    }

    this.dom = document.createElement('div');
    this.dom.className = 'toast-wrap';

    ReactDOM.render(<div className="text">{msg}</div>, this.dom);
    document.body.appendChild(this.dom);

    this.dom.timerOut = setTimeout(() => {
      clearTimeout(this.dom.timerOut);
      document.body.removeChild(this.dom);
      callback();
    }, duration);
  }
};
