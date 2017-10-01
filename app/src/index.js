'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import LayoutDemo from './App';

class App extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        counter: 1
      }
      setInterval(() => {
        this.setState({
          counter:this.state.counter + 1
        })
      }, 1500)
    }
  
    render(some) {
  
      return (
        <div key={1} style={{ background: `rgb(99,99,${this.state.counter + 1})` }}>
          <div>
            {/* {[2,3,4,5].map((el,ix)=>{
              return(
                <div key={1}>{ix === 1?this.state.counter:1}</div>
              )
            })} */}
            <div key='1'>{this.state.counter}</div>
            <div key='1'>{this.state.counter}</div>
            <div >1</div>
            <div >1</div>
            <div >1</div>
          </div>
        </div>
      )
    }
  }


ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('root')
);