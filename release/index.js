'use strict';

import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import LayoutDemo from './App';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || _Object$getPrototypeOf(App)).call(this, props));

    _this.state = {
      counter: 1
    };
    setInterval(function () {
      _this.setState({
        counter: _this.state.counter + 1
      });
    }, 1500);
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render(some) {

      return React.createElement(
        'div',
        { key: 1, style: { background: 'rgb(99,99,' + (this.state.counter + 1) + ')' } },
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { key: '1' },
            this.state.counter
          ),
          React.createElement(
            'div',
            { key: '1' },
            this.state.counter
          ),
          React.createElement(
            'div',
            null,
            '1'
          ),
          React.createElement(
            'div',
            null,
            '1'
          ),
          React.createElement(
            'div',
            null,
            '1'
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(App, null)
), document.getElementById('root'));
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(App, 'App', 'app/src/index.js');
}();

;