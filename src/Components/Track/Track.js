import React from 'react';
import './Track.css';

class Track extends React.Component {
  
  constructor(props) {
	  super(props);
	  this.addTrack = this.addTrack.bind(this);
	  this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction (isRemoval) {
	  if (isRemoval) {
		  return <a href = "#" className = "Track-action" onClick = {this.addTrack}>+</a>;
	  } else {
		  return <a href = "#" className = "Track-action" onClick = {this.removeTrack}>-</a>;
	  }
  }
	
  addTrack(props) {
	  this.props.onAdd = this.props.track;
  }
  
  removeTrack(props) {
	this.props.onRemove = this.props.track;  
  }
  
  render() {
    return (
    div className="Track">
	  <div className="Track-information">
		<h3><!-- track name will go here --></h3>
		<p><!-- track artist will go here--> | <!-- track album will go here --></p>
	  </div>
	  <a className="Track-action"><!-- + or - will go here --></a>
	</div>
    );
  }
  
  
}

export default Track;
