import React from 'react';
import PropTypes from 'prop-types';
import {
  int,
  innerHeight,
  innerWidth,
  outerHeight,
  outerWidth,
  parseBounds,
  isNumber
} from './utils';

import classNames from 'classnames';

const doc = document;

const noop = (x, y) => {};

class Dragger extends React.Component {
  /**
   * 初始变量设置
   */
  static defaultProps = {
    allowX: true,
    allowY: true,
    x: void 666,
    y: void 666,
    onDragging: noop
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState !== this.state ||
      JSON.stringify(nextProps) !== JSON.stringify(this.props)
    );
  }

  state = {
    /** x轴位移，单位是px */
    x: 0,
    /** y轴位移，单位是px */
    y: 0,
    /**鼠标点击元素的原始位置，单位是px */
    originX: 0,
    originY: 0,
    /**已经移动的位移，单位是px */
    lastX: 0,
    lastY: 0,
    dragging: false
  };

  getParent = node => {
    this.parent = node;
  };

  move = event => {
    /** 保证用户在移动元素的时候不会选择到元素内部的东西 */
    doc.body.style.userSelect = 'none';

    let { lastX, lastY } = this.state;
    /*  event.client - this.state.origin 表示的是移动的距离,
    *   elX表示的是原来已经有的位移
    */
    let deltaX = event.clientX - this.state.originX + lastX;
    let deltaY = event.clientY - this.state.originY + lastY;

    if (event.type === 'touchmove') {
      deltaX = event.touches[0].clientX - this.state.originX + lastX;
      deltaY = event.touches[0].clientY - this.state.originY + lastY;
    }

    /**
     * 网格式移动范围设定，永远移动 n 的倍数
     * 注意:设定移动范围的时候，一定要在判断bounds之前，否则会造成bounds不对齐
     */
    const { grid } = this.props;
    if (Array.isArray(grid) && grid.length === 2) {
      deltaX = Math.round(deltaX / grid[0]) * grid[0];
      deltaY = Math.round(deltaY / grid[1]) * grid[1];
    }

    const { bounds } = this.props;
    if (bounds) {
      /**
       * 如果用户指定一个边界，那么在这里处理
       */
      let NewBounds = bounds === true ? bounds : parseBounds(bounds);

      if (this.parent) {
        NewBounds = {
          left:
            int(this.parent.style.paddingLeft) +
            int(this.self.style.marginLeft) -
            this.self.offsetLeft,
          top:
            int(this.parent.style.paddingTop) +
            int(this.self.style.marginTop) -
            this.self.offsetTop,
          right:
            innerWidth(this.parent) -
            outerWidth(this.self) -
            this.self.offsetLeft +
            int(this.self.style.borderRight) -
            int(this.parent.style.paddingRight) -
            int(this.self.style.marginRight) -
            int(this.parent.style.borderRight),
          bottom:
            innerHeight(this.parent) -
            outerHeight(this.self) -
            this.self.offsetTop +
            int(this.parent.style.paddingBottom) -
            int(this.self.style.marginBottom)
        };
      }

      /**
       * 保证不超出右边界和底部
       *
       */
      if (isNumber(NewBounds.right)) deltaX = Math.min(deltaX, NewBounds.right);
      if (isNumber(NewBounds.bottom))
        deltaY = Math.min(deltaY, NewBounds.bottom);

      /**
       * 保证不超出左边和上边
       *
       */
      if (isNumber(NewBounds.left)) deltaX = Math.max(deltaX, NewBounds.left);
      if (isNumber(NewBounds.top)) deltaY = Math.max(deltaY, NewBounds.top);
    }

    /**如果设置了x,y限制 */
    deltaX = this.props.allowX ? deltaX : 0;
    deltaY = this.props.allowY ? deltaY : 0;

    /**移动时回调，用于外部控制 */
    this.props.onDragMove && this.props.onDragMove(event, deltaX, deltaY);
    this.props.onDragging(deltaX, deltaY);

    this.setState({
      x: deltaX,
      y: deltaY
    });
  };

  onDragStart = event => {
    if (this.props.static === true) return;

    /**
     * 把监听事件的回掉函数，绑定在document上
     * 当设置边界的时候，用户鼠标会离开元素的范围
     * 绑定在document上可以使得其依旧能够监听
     * 如果绑定在元素上，则鼠标离开元素，就不会再被监听了
     */
    doc.addEventListener('mousemove', this.move);
    doc.addEventListener('mouseup', this.onDragEnd);

    doc.addEventListener('touchmove', this.move);
    doc.addEventListener('touchend', this.onDragEnd);

    if (this.parent) {
      /**
       * 我们自己
       */
      this.self = event.currentTarget;
    }

    this.props.onDragStart &&
      this.props.onDragStart(event, this.state.x, this.state.y);

    this.props.onDragging(this.props.x, this.props.y);

    let deltaX = event.clientX;
    let deltaY = event.clientY;

    if (event.type === 'touchstart') {
      deltaX = event.touches[0].clientX;
      deltaY = event.touches[0].clientY;
    }
    this.setState({
      originX: deltaX,
      originY: deltaY,
      lastX: this.state.x,
      lastY: this.state.y,
      dragging: true
    });
  };

  onDragEnd = event => {
    /** 取消用户选择限制，用户可以重新选择 */
    doc.body.style.userSelect = '';

    this.self = null;
    doc.removeEventListener('mousemove', this.move);
    doc.removeEventListener('mouseup', this.onDragEnd);

    doc.removeEventListener('touchmove', this.move);
    doc.removeEventListener('touchend', this.onDragEnd);

    this.props.onDragging(this.props.x, this.props.y);
    this.setState(
      {
        dragging: false
      },
      () => {
        if (this.props.onDragEnd) this.props.onDragEnd(event);
      }
    );
  };

  componentDidUpdate() {
    if (this.props.controlled) {
      if (this.props.x !== this.state.x || this.props.y !== this.state.y) {
        this.setState({
          x: this.props.x,
          y: this.props.y
        });
      }
    }
  }

  componentDidMount() {
    /**
     * 这个函数只会调用一次
     * 这个只是一个临时的解决方案，因为这样会使得元素进行两次刷新
     */
    if (typeof this.props.x === 'number' && typeof this.props.y === 'number') {
      this.setState({
        x: this.props.x,
        y: this.props.y
      });
    }
  }

  render() {
    const { x, y } = this.state;
    const { className, children, controlled } = this.props;

    let X = 0;
    let Y = 0;
    if (controlled) {
      X = this.props.x;
      Y = this.props.y;
    } else {
      X = x;
      Y = y;
    }
    // const X = this.props.x === void 666 ? x : this.props.x;
    // const Y = this.props.y === void 666 ? y : this.props.y;

    /**主要是为了让用户定义自己的className去修改css */
    const fixedClassName = classNames('WrapDragger', {
      [className]: className !== void 666
    });

    const getHandle = () => {
      return {
        onMouseDown: this.onDragStart,
        onMouseUp: this.onDragEnd,
        onTouchStart: this.onDragStart,
        onTouchEnd: this.onDragEnd
      };
    };
    const providedStyle = {
      touchAction: 'none!important',
      transform: `translate3d(${X}px,${Y}px,0)`
    };
    const bound = {
      instance: this.getParent,
      /**
       * 边框依赖 position 属性
       */
      style: { position: 'absolute' }
    };

    return (
      <div className={fixedClassName}>
        {children({
          style: providedStyle,
          handle: getHandle,
          x: X,
          y: Y,
          bound: bound,
          static: this.props.static,
          dragging: this.state.dragging
        })}
      </div>
    );
  }
}

Dragger.propTypes = {
  /**
   * 给予元素一个x,y的初始位置，单位是px
   */
  x: PropTypes.number,
  y: PropTypes.number,

  /**
   * 以网格的方式移动，每次移动并不是平滑的移动
   * [20,30]，鼠标x轴方向移动了20 px ，y方向移动了30 px，整个子元素才会移动
   */
  grid: PropTypes.arrayOf(PropTypes.number),

  /**只允许移动x轴 */
  allowX: PropTypes.bool,

  /**只允许移动y轴 */
  allowY: PropTypes.bool,

  /**
   * 是否由用户移动
   * 可能是通过外部props改变
   */
  isUserMove: PropTypes.bool,

  /**
   * 是否静态
   * 设置了就不可移动
   */
  static: PropTypes.bool,

  /**
   * 开始拖拽
   */
  onDragStart: PropTypes.func,
  /**
   * 正在拖拽
   */
  onDragMove: PropTypes.func,
  /**
   * 结束拖拽，鼠标弹开
   */
  onDragEnd: PropTypes.func,

  /**
   * 受控函数
   */
  onDragging: PropTypes.func
};

export default Dragger;
