import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import List from './list';

const Data = [];

for (let index = 0; index < 20; index++) {
  Data.push({ name: index + 1, o: index });
}

class C extends React.Component {
  state = { horzontal: false, gap: 100 };

  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.setState({
              horzontal: !this.state.horzontal,
              gap: this.state.horzontal ? 100 : 220
            });
          }}
        >
          换
        </button>
        <List
          horizontal={this.state.horzontal}
          data={Data}
          gap={this.state.gap}
          renderItem={(handle, data) => (
            <div className="props-draggers" {...handle()}>
              {data.name}
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<C />, document.getElementById('root'));
registerServiceWorker();
