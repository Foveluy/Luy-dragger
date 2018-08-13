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
