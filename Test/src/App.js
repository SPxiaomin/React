/* global $ */
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//
// }
// export default App;
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux';

import {
  PLAY,
  TOGGLE_START,
  TOGGLE_FIRST,
  CHANGE_PROGRESS,
} from './action';

// let Home = ({ counter }) => (
// );

class Home extends Component {
  componentDidMount() {
    $('#player')
      .jPlayer({
        supplied: 'mp3'
      });

    if (this.props.isFirst) {
      $('#player')
        .jPlayer('setMedia', {
          mp3: this.props.musiclist[this.props.currentIndex].file
        });

      this.props.toggleFirst();
    }

    $('#player')
      .on($.jPlayer.event.timeupdate, (e) => {
        // console.log(e.jPlayer.status.currentTime);
        // console.log(e.jPlayer.status.currentPercentAbsolute)
        this.props.changeProgress(e.jPlayer.status.currentPercentAbsolute);
      });
      // .jPlayer('setMedia', {
      //   mp3: this.props.musiclist[this.props.currentIndex].file
      // });
      // .jPlayer('setMedia', {
      //   mp3: this.props.musiclist[0].file
      // })
      // .jPlayer('play');
  }

  progressChangeHandler(e) {

  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>currentMusic: {this.props.musiclist[this.props.currentIndex].name}</p>
        <button onClick={() => {
            this.props.isStart ? $('#player').jPlayer('pause') : $('#player').jPlayer('play');
            this.props.toggleStart();
          }}
        >
          isStart: {this.props.isStart ? 'STOP' : 'START'}
        </button>

        <hr />

        <div style={{ height: '5px', backgroundColor: '#ddd' }} onClick={(e) => {
          this.progressChangeHandler(e);
        }}>
          <div style={{ height: '5px', backgroundColor: '#2f9842', width: `${this.props.progress}%` }}>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToHomeProps = (state) => ({
  musiclist: state.musiclist,
  currentIndex: state.currentIndex,
  isStart: state.isStart,
  isFirst: state.isFirst,
  progress: state.progress,
});

const mapDispatchToHomeProps = (dispatch) => ({
  toggleStart: () => {
    dispatch(TOGGLE_START());
  },
  toggleFirst: () => {
    dispatch(TOGGLE_FIRST());
  },
  changeProgress: (progress) => {
    dispatch(CHANGE_PROGRESS(progress));
  }
});

Home = withRouter(connect(
  mapStateToHomeProps,
  mapDispatchToHomeProps
)(Home));

let About = ({ musiclist, clickPlay }) => {
  let playMusic = (music) => {
    $('#player')
      .jPlayer('setMedia', {
        mp3: music.file
      })
      .jPlayer('play');
  };

  return (
    <div>
      <h2>About</h2>
      <ul>
        {
          musiclist.map((music, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  playMusic(music);
                  clickPlay(index);
                }}
              >
                {music.name}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToAboutProps = (state) => ({
  musiclist: state.musiclist
});

const mapDispatchToAboutProps = dispatch => ({
  clickPlay: (index) => dispatch(PLAY(index))
});

About = withRouter(connect(
  mapStateToAboutProps,
  mapDispatchToAboutProps
)(About));

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
);

export default BasicExample;
