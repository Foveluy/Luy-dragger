# React拖拽组件 (React-dragger-R)

[![npm](https://img.shields.io/badge/npm-0.0.11-green.svg)](https://www.npmjs.com/package/react-dragger-r)

简介
----
...A wheel....anyway

一个轮子，用react做的拖拽组件。易懂，易用，纯粹使用react，无需jQuery

### 在线demo
[预览地址(demo)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-R/blob/master/build/index.html)

###  安装
```
npm install --save react-dragger-r
```

### 本地预览
```
git clone https://github.com/215566435/React-dragger-R.git
cd React-dragger-R
npm install
npm run dev


```
登陆本地预览地址：[http://127.0.0.1:8080/](http://127.0.0.1:8080/)



基本用法
----
使用Dragger组件去包裹任意一个组件即可

[预览地址(demo)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-R/blob/master/build/index.html)的[源码](https://github.com/215566435/React-dragger-R/blob/master/app/src/App.js)在这里

````javascript
import React from 'react'
import Dragger from 'react-dragger-r'
import ReactDOM from 'react-dom'

class LayoutDemo extends React.Component {
    render() {
        return (
            <div>
                <Dragger style={{ left: 50 }}>
                    <div>普通的拖拽组件</div>
                </Dragger>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <LayoutDemo />
    </div>,
    document.getElementById('root')
);

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


        /*
        * css Style
        * 如：style={{padding:10}}
        */
        style
````

### 注意事项
子元素中只能拥有一个根元素，即只能以下列的形式存在，必须在外包裹一层
````javascript
    <Dragger style={{ left: 50 }}>
            <div>
                <div>组件1</div>
                <div>组件2</div>
            </div>
    </Dragger>
````

至于这样的组件是不允许的

````javascript
    <Dragger style={{ left: 50 }}>
            <div>组件1</div>
            <div>组件2</div>
    </Dragger>
````




TodoList
----

- [x] 完成基本的逻辑
- [x] 手机端的适配
- [ ] 使用Ts重写
- [ ] 代码逻辑封装


