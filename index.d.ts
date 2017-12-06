/// <reference types="react" />
import React from 'react';

interface bounds {
    left: Number,
    right: Number,
    top: Number,
    bottom: Number
}

export interface DraggerProps {
    /**
    * 给予元素一个x的初始位置，单位是px
    */
    x?: Number,
    /**
    * 给予元素一个y的初始位置，单位是px
    */
    y?: Number,

    /**
     * 拖动范围限制
     * 如果不规定范围，那么子元素就可以随意拖动不受限制
     * 
     * 1.可以提供自定义的范围限制
     * 
     * 2.也可以提供父类为边框的范围限制(string === parent)
     */
    bounds: bounds | String,
    /**
     * 以网格的方式移动，每次移动并不是平滑的移动
     * [20,30]，鼠标x轴方向移动了20 px ，y方向移动了30 px，整个子元素才会移动
     */
    grid: Array<Number>,

    /**只允许移动x轴 */
    allowX: Boolean,

    /**只允许移动y轴 */
    allowY: Boolean,

    /**
     * 内部的移动拖拽把手
     * 拖拽把手className一定要设置成handle并且这个属性设置成true
     * <Dragger hasDraggerHandle={true}>
     *      <div className={handle} >点击我拖动</div>
     * </Dragger>
     */
    hasDraggerHandle: Boolean,

    /**
     * 内部取消的区域 
     * <Dragger hasCancelHandle={true}>
     *      <div className={cancel} >点击我拖动</div>
     * </Dragger>
    */
    hasCancelHandle: Boolean,


    /**
     * 是否由用户移动
     * 可能是通过外部props改变
     */
    isUserMove: Boolean,

    /**
     * 是否静态
     * 设置了就不可移动
     */
    static: Boolean,

    /**
     * 生命周期回调
     */
    onDragStart: Function,
    onMove: Function,
    onDragEnd: Function
}




declare class Dragger extends React.Component<DraggerProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
        inline: boolean;
        disabled: boolean;
        loading: boolean;
        activeStyle: {};
    };
    render(): JSX.Element;
}
export default Dragger;