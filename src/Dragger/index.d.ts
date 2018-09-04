import * as React from "react";

interface DraggerProps {
  /**
   * 给予元素一个x,y的初始位置，单位是px
   */
  x: Number;
  y: Number;

  /**
   * 以网格的方式移动，每次移动并不是平滑的移动
   * [20,30]，鼠标x轴方向移动了20 px ，y方向移动了30 px，整个子元素才会移动
   */
  grid: Array<Number>;

  /**只允许移动x轴 */
  allowX: Boolean;

  /**只允许移动y轴 */
  allowY: Boolean;

  /**
   * 是否由用户移动
   * 可能是通过外部props改变
   */
  isUserMove: Boolean;

  /**
   * 是否静态
   * 设置了就不可移动
   */
  static: Boolean;

  /**
   * 开始拖拽
   */
  onDragStart: (event: any, x: Number, y: Number) => void;
  /**
   * 正在拖拽
   */
  onDragMove: (event: any, x: Number, y: Number) => void;
  /**
   * 结束拖拽，鼠标弹开
   */
  onDragEnd: (event: any) => void;

  /**
   * 受控函数
   */
  onDragging: (x: Number, y: Number) => void;

  /**
   * style 内部提供的属性，用于存放该组件是否可以移动
   * handle 推拽把手，是个函数，用法：{...handle()}
   * x 偏移原始位置 x坐标
   * y 偏移原始位置 y坐标
   * bound 有一个 instance 是给周围的边框的，style 也是给周围边框的
   * static 是否静态
   * dragging 是否在拖拽
   */
  children: (
    {
      style: any,
      handle: any,
      x: Number,
      y: Number,
      bound: { instance: any, style: any },
      static: Boolean,
      dragging: Boolean
    }
  ) => React.ReactNode;
}

export default class Dragger extends React.Component<DraggerProps, {}> {}
