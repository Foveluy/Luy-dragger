import React from 'react';
import Dragger from './Dragger';
import Equal from 'fast-deep-equal';

/**
 * 2.4213xxx -> 2
 * 2.62xxx->3
 */
const clamp = x => {
  const num = parseInt(x, 10);
  // 获得小数位
  const left = x - num;
  //看看到底是大于 0.5 小于 0.5，
  return left > 0.5 ? num + 1 : num;
};

/**
 *  min<num<max
 */
const between = (num, min, max) => {
  return Math.max(min, Math.min(num, max));
};

export default class SortList extends React.Component {
  constructor(props) {
    super(props);

    const data = props.data;
    this.state = {
      order: data,
      currentOrder: -1,
      autoScrolling: false
    };
    this.manager = {};
    this.timer = -1;
    this.currentX = 0;
    this.currentY = 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Equal(this.props, nextProps) || !Equal(nextState, this.state);
  }

  static defaultProps = {
    gap: 80,
    horizontal: false,
    renderItem: () => null
  };

  dragging = (preOrder, x, y, event) => {
    this.currentX = x;
    this.currentY = y;
    const fixedDirection = this.props.horizontal ? x : y;

    const o = clamp(fixedDirection / this.getGap(preOrder.o));
    const max = this.state.order.length - 1;
    const newOrder = this.state.order.map(od => {
      if (o === od.o) {
        return { ...od, o: preOrder.o };
      }
      if (preOrder.o === od.o) {
        return { ...od, o: between(o, 0, max) };
      }
      return od;
    });

    if (this.container.scrollTop + 300 - y < 100 && this.timer === -1) {
      /**
       * 当有已经有滚动的时候，我们需要减去自动滚动前的 scrolltop
       */
      const currentScrollTop = this.container.scrollTop;
      const scrollOffsetY = event.clientY / 80;

      this.timer = setInterval(() => {
        const max = this.state.order.length - 1;
        if (this.state.currentOrder >= max) {
          return;
        }

        const nextY =
          this.currentY + this.container.scrollTop - currentScrollTop;

        //自动滚动
        this.manager[preOrder.name].autoMove(this.currentX, nextY);
        //设置滚动
        this.container.scrollTop += scrollOffsetY;

        // console.log(y + this.container.scrollTop);

        const o = clamp(nextY / this.getGap(preOrder.o));

        // console.log(this.manager[preOrder.name]);

        const newOrder = this.state.order.map(od => {
          if (preOrder.name === od.name) {
            return { ...od, o: o };
          }
          if (preOrder.name !== od.name && o === od.o) {
            return { ...od, o: between(o - 1, 0, max) };
          }
          return od;
        });

        if (
          nextY - this.container.scrollTop < 150 &&
          this.state.autoScrolling
        ) {
          clearInterval(this.timer);

          console.log(o);
          this.timer = -1;
          this.setState({
            currentOrder: o,
            autoScrolling: false
          });

          return;
        }

        this.setState({
          currentOrder: o,
          order: newOrder,
          autoScrolling: true
        });
      }, 5);
    }

    if (!this.state.autoScrolling) {
      this.setState({
        currentOrder: preOrder.o,
        order: newOrder
      });
    }
  };

  dragEnd = () => {
    clearInterval(this.timer);
    this.timer = -1;
    this.setState({
      currentOrder: -1,
      autoScrolling: false
    });
  };

  getGap = () => {
    return this.props.gap;
  };

  render() {
    return (
      <div
        ref={node => (this.container = node)}
        style={{ height: 300, overflow: 'scroll' }}
      >
        <div style={{ position: 'relative', height: 20 * 100 }}>
          {this.state.order.map(order => {
            //获取当前的实际位置
            const delta = order.o * this.getGap(order.o);
            return (
              <Dragger
                ref={node => (this.manager[order.name] = node)}
                parent={() => this.container}
                onDragMove={(event, x, y) => this.dragging(order, x, y, event)}
                key={order.name}
                x={this.props.horizontal ? delta : 0}
                controlled={this.state.currentOrder !== order.o}
                y={this.props.horizontal ? 0 : delta}
                onDragEnd={this.dragEnd}
              >
                {({ style, handle, dragging }) => (
                  <div
                    style={{
                      ...style,
                      position: 'absolute',
                      transition:
                        this.state.currentOrder === order.o ? '' : 'all 0.3s'
                    }}
                  >
                    {this.props.renderItem(handle, order)}
                  </div>
                )}
              </Dragger>
            );
          })}
        </div>
      </div>
    );
  }
}
