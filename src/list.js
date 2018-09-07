import React from "react";
import Dragger from "./Dragger";
import Equal from "fast-deep-equal";

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
      currentOrder: -1
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Equal(this.props, nextProps) || !Equal(nextState, this.state);
  }

  static defaultProps = {
    gap: 80,
    horizontal: false,
    renderItem: () => null
  };

  dragging = (preOrder, x, y) => {
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

  getGap = () => {
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
              x={this.props.horizontal ? delta : 0}
              controlled={this.state.currentOrder !== order.o}
              y={this.props.horizontal ? 0 : delta}
              onDragEnd={this.dragEnd}
            >
              {({ style, handle }) => (
                <div
                  style={{
                    ...style,
                    position: "absolute",
                    transition:
                      this.state.currentOrder === order.o ? "none" : "all 0.3s"
                  }}
                >
                  {this.props.renderItem(handle, order)}
                </div>
              )}
            </Dragger>
          );
        })}
      </div>
    );
  }
}
