import React from 'react';
import Dragger from './Dragger';

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

export default class SortList extends React.Component {
  constructor(props) {
    super(props);
    this.item = {};
    this.state = {
      order: [
        { name: 1, o: 0 },
        { name: 2, o: 1 },
        { name: 3, o: 2 },
        { name: 4, o: 3 }
      ],
      currentOrder: -1
    };
  }

  static defaultProps = {
    gap: 80,
    horizontal: false
  };

  dragging = (preOrder, x, y) => {
    const fixedDirection = this.props.horizontal ? x : y;

    const o = clamp(fixedDirection / this.getGap(preOrder.o));
    const count = this.state.order.length - 1;
    const newOrder = this.state.order.map(od => {
      if (o === od.o) {
        return { ...od, o: preOrder.o };
      }
      if (preOrder.o === od.o) {
        return { ...od, o: o > count ? count : o };
      }
      return od;
    });

    this.setState({
      currentOrder: preOrder.o,
      order: newOrder
    });
  };

  dragEnd = () => {
    this.setState({
      currentOrder: -1
    });
  };

  getGap = order => {
    return this.props.gap;
  };

  render() {
    return (
      <div>
        {this.state.order.map(order => {
          //获取当前的实际位置
          const delta = order.o * this.getGap(order.o);
          return (
            <Dragger
              onDragMove={(event, x, y) => this.dragging(order, x, y)}
              key={order.name}
              x={this.props.horizontal ? delta : 300}
              controlled={this.state.currentOrder !== order.o}
              y={this.props.horizontal ? 300 : delta}
              onDragEnd={this.dragEnd}
            >
              {({ style, handle }) => (
                <div
                  ref={node => (this.item[order.o] = node)}
                  className="props-draggers"
                  style={{
                    ...style,
                    position: 'absolute',
                    transition:
                      this.state.currentOrder === order.o ? 'none' : 'all 0.3s'
                  }}
                  {...handle()}
                >
                  item {order.name}
                </div>
              )}
            </Dragger>
          );
        })}
      </div>
    );
  }
}
