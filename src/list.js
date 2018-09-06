import React from 'react';
import Dragger from './Dragger';

/**
 * 2.4213xxx -> 2
 * 2.62xxx->3
 */
const clamp = x => {
  const num = parseInt(x);
  // 获得小数位
  const left = x - num;
  //看看到底是大于 0.5 小于 0.5，
  return left >= 0.5 ? num + 1 : num;
};

export default class SortList extends React.Component {
  static defaultProps = {
    gap: 80
  };

  state = {
    order: [{ name: 1, o: 0 }, { name: 2, o: 1 }, { name: 3, o: 2 }],
    currentOrder: -1
  };

  dragging = (preOrder, x, y) => {
    const o = clamp(y / this.props.gap);
    const newOrder = this.state.order.map(od => {
      if (o === od.o) {
        return { ...od, o: preOrder.o };
      }
      if (preOrder.o === od.o) {
        return { ...od, o: o > 2 ? 2 : o };
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

  render() {
    return (
      <div>
        {this.state.order.map(order => (
          <Dragger
            onDragMove={(event, x, y) => this.dragging(order, x, y)}
            key={order.name}
            x={300}
            controlled={this.state.currentOrder !== order.o}
            y={order.o * this.props.gap}
            onDragEnd={() => this.dragEnd(order.o)}
          >
            {({ style, handle }) => (
              <div
                className="props-draggers"
                style={{
                  ...style,
                  position: 'absolute',
                  transition:
                    this.state.currentOrder === order.o
                      ? 'none'
                      : 'all ease 0.2s'
                }}
                {...handle()}
              >
                普通的拖拽组件*{order.name}
              </div>
            )}
          </Dragger>
        ))}
      </div>
    );
  }
}
