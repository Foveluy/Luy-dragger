## API 描述

| 名字            |                                                                  描述                                                                  |  类型  | 是否需要 |    默认值 |
| --------------- | :------------------------------------------------------------------------------------------------------------------------------------: | :----: | -------: | --------: |
| x               |                                           <br/> 给予元素一个 x,y 的初始位置，单位是 px<br/>                                            | number |    false | undefined |
| y               |                                                                                                                                        | number |    false | undefined |
| grid            | <br/> 以网格的方式移动，每次移动并不是平滑的移动<br/> [20,30]，鼠标 x 轴方向移动了 20 px ，y 方向移动了 30 px，整个子元素才会移动<br/> | array  |    false | undefined |
| allowX          |                                                            只允许移动 x 轴                                                             |  bool  |    false |      true |
| allowY          |                                                            只允许移动 y 轴                                                             |  bool  |    false |      true |
| hasCancelHandle |     <br/> 内部取消的区域<br/> <Dragger hasCancelHandle={true}><br/> <div className={cancel} >点击我拖动</div><br/> </Dragger><br/>     |  bool  |    false | undefined |
| isUserMove      |                                        <br/> 是否由用户移动<br/> 可能是通过外部 props 改变<br/>                                        |  bool  |    false |      true |
| static          |                                               <br/> 是否静态<br/> 设置了就不可移动<br/>                                                |  bool  |    false | undefined |
| onDragStart     |                                                        <br/> 生命周期回调<br/>                                                         |  func  |    false | undefined |
| onMove          |                                                                                                                                        |  func  |    false | undefined |
| onDragEnd       |                                                                                                                                        |  func  |    false | undefined |
