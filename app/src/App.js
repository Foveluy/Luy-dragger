import React from 'react'
import PropTypes from 'prop-types'
import Dragger from './Dragger'

import './style.css'



export default class LayoutDemo extends React.Component {


    state = {
        x: 0,
        y: 0
    }

    onDrag(e, x, y) {
        this.setState({
            x: x, y: y
        })
    }
    render() {
        return (
            <div>
                <Dragger style={{ left: 50 }}>
                    <div>普通的拖拽组件</div>
                </Dragger>
                <Dragger allowY={false} style={{ left: 250 }} >
                    <div>不允许在y轴移动</div>
                </Dragger>
                <Dragger allowX={false} style={{ left: 450 }}>
                    <div>不允许在x轴移动</div>
                </Dragger>
                <Dragger onMove={this.onDrag.bind(this)} style={{ left: 650 }}>
                    <div>
                        <div>x:{this.state.x} px</div>
                        <div>x:{this.state.y} px</div>
                    </div>
                </Dragger>
                <Dragger style={{ left: 50, top: 200 }} hasDraggerHandle={true}>
                    <div>
                        <div
                            className='handle'
                            style={{
                                padding: 8, textAlign: 'center',
                                background: 'rgba(120, 120, 120, 0.4)', 
                                marginBottom: 8,
                                borderRadius: '5px',
                                color:'white'
                            }}
                        >
                            拖拽把手
                        </div>
                        <div>点把手拖拽</div>
                    </div>
                </Dragger>
                <Dragger style={{ left: 50, top: 400 }} hasCancelHandle={true}>
                    <div>
                        <div
                            className='cancel'
                            style={{
                                padding: 8, textAlign: 'center',
                                background: 'rgba(120, 120, 120, 0.4)', 
                                marginBottom: 8,
                                borderRadius: '5px',
                                color:'white'
                            }}
                        >
                            点这无法拖动
                        </div>
                        <div style={{textAlign: 'center'}}>点击拖拽</div>
                    </div>
                </Dragger>


                <Dragger grid={[25, 25]} style={{ left: 250, top: 200 }} >
                    <div>
                        <div>网格移动</div>
                        <div>每次移动30px</div>
                    </div>
                </Dragger>
                <Dragger grid={[100, 100]} style={{ left: 450, top: 200 }} >
                    <div>
                        <div>网格移动</div>
                        <div>每次移动100px</div>
                    </div>
                </Dragger>
                <Dragger static={true} style={{ left: 650, top: 200 }} >
                    <div>
                        <div>别想拖动我</div>
                    </div>
                </Dragger>
                <div className='bounds' style={{ zIndex: -1, border: ' 1px solid rgba(120, 120, 120, 0.4)', left: 900, top: 200, width: 500, height: 500, position: 'absolute' }}>
                    <Dragger bounds='parent' >
                        <div>不能离开框框的范围</div>
                    </Dragger>
                    <Dragger bounds='parent' style={{ left: 200, margin: 10 }} >
                        <div>
                            <div>不能离开框框的范围</div>
                            <div>并且有10px的margin</div>
                        </div>
                    </Dragger>
                </div>
            </div>
        )
    }

}