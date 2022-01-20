import React from 'react';
import videojs from "video.js/dist/video.js"
import 'video.js/dist/video-js.css'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
      this.player = videojs('myVideo', options);
      this.player.src({
        src: "rtmp://58.200.131.2:1935/livetv/cctv1",
        type:'rtmp/flv',
      });
      this.player.load();
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}