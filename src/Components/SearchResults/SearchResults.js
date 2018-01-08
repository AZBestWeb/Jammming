import React from 'react';
import './SearchResults.css';
import '././TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
		  <h2>Results</h2>
		  // step 43
		  <TrackList track = {this.props.searchResults} onAdd = {this.props.onAdd}/>
	  </div>
    );
  }
}

export default SearchResults;
