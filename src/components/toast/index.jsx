import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default {
  $toast({ msg = '', callback = () => {}, duration = 1500 }) {
    let oToast = document.createElement('div');
    oToast.className = 'toast-wrap';

    ReactDOM.render(<div className="text">{msg}</div>, oToast);
    document.body.appendChild(oToast);

    setTimeout(() => {
      document.body.removeChild(oToast);
      callback();
    }, duration);
  }
};
