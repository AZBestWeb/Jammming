import React from 'react';
//import logo from './logo.svg';
import './TrackList.css';
import Track from '../Track/Track';
class TrackList extends React.Component {
  render() {
    return (
    <div className="TrackList">
	{
		this.props.tracks.map(track=> {
			return (
			<Track track = {track} artist={track.artist} album={track.album} onAdd={this.props.onAdd} onRemove = {this.props.onRemove}/>
			)
		}) 
	}
	</div>
    );
  }
}

export default TrackList;
