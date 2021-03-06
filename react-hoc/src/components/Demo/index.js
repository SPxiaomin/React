import React, { Component } from 'react';

// import withHeader from '../../utils/HOC/withHeader';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innerText: '我是一个普通组件'
    };
  }

  render() {
    return (
      <div {...this.props}>
        {this.state.innerText}
      </div>
    );
  }
}

export default Demo;
