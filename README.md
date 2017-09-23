# React拖拽组件 (React-dragger-R)

简介
----
...A wheel....anyway

一个轮子

[预览地址(demo)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-R/blob/master/build/index.html)

基本用法
----
````javascript

<Dragger>
    <div>普通的拖拽组件</div>
</Dragger>

````

### 属性
````javascript
 /**
         * 给予元素一个x,y的初始位置，单位是px
         */
        x: PropTypes.number,
        y: PropTypes.number,

        /**
         * 拖动范围限制
         * 如果不规定范围，那么子元素就可以随意拖动不受限制
         * 1.可以提供自定义的范围限制
         * 2.也可以提供父类为边框的范围限制(string === parent)
         */
        bounds: PropTypes.oneOfType([
            PropTypes.shape({
                left: PropTypes.number,
                right: PropTypes.number,
                top: PropTypes.number,
                bottom: PropTypes.number
            }),
            PropTypes.string
        ]),
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
         * 内部的移动拖拽把手
         * 拖拽把手className一定要设置成handle并且这个属性设置成true
         * <Dragger hasDraggerHandle={true}>
         *      <div className={handle} >点击我拖动</div>
         * </Dragger>
         */
        hasDraggerHandle: PropTypes.bool,

        /**
         * 内部取消的区域 
         * <Dragger hasCancelHandle={true}>
         *      <div className={cancel} >点击我拖动</div>
         * </Dragger>
        */
        hasCancelHandle: PropTypes.bool,


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
         * 生命周期回调
         */
        onDragStart: PropTypes.func,
        onMove: PropTypes.func,
        onDragEnd: PropTypes.func
````




TodoList
----

- [x] 完成基本的逻辑
- [ ] 手机端的适配
- [ ] 使用Ts重写
- [ ] 代码逻辑封装


