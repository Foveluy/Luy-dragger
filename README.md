# Props dragger

这是一款使用 `render props` 写成的拖拽组件，使得获取组件状态格外简单

## 安装

```js
npm install props-dragger
```

## 最简单的例子

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Dragger from '@props/dragger';

const Demo = () => {
  return (
    <Dragger>
      {({ style, handle }) => (
        <div className={name} style={{ ...style }} {...handle()}>
          普通的拖拽组件
        </div>
      )}
    </Dragger>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
```

## API 和 Props

[API and Props](https://github.com/Foveluy/Luy-dragger#api-%E6%8F%8F%E8%BF%B0)


## API 描述
|名字| 描述|类型|是否需要|默认值|
| ------------- |:-------------:|:-----:| -----:|-----:|
|x|<br/>    给予元素一个x,y的初始位置，单位是px<br/>   |number|false|undefined|
|y||number|false|undefined|
|grid|<br/>    以网格的方式移动，每次移动并不是平滑的移动<br/>    [20,30]，鼠标x轴方向移动了20 px ，y方向移动了30 px，整个子元素才会移动<br/>   |array|false|undefined|
|allowX|只允许移动x轴 |bool|false|true|
|allowY|只允许移动y轴 |bool|false|true|
|isUserMove|<br/>    是否由用户移动<br/>    可能是通过外部props改变<br/>   |bool|false|undefined|
|static|<br/>    是否静态<br/>    设置了就不可移动<br/>   |bool|false|undefined|
|onDragStart|<br/>    开始拖拽<br/>   |func|false|undefined|
|onDragMove|<br/>    正在拖拽<br/>   |func|false|undefined|
|onDragEnd|<br/>    结束拖拽，鼠标弹开<br/>   |func|false|undefined|
|onDragging|<br/>    受控函数<br/>   |func|false|undefined|
    