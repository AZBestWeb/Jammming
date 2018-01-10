import React, { Component } from 'react';
//import './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify/Spotify';
class App extends Component {
  
  constructor(props) {
	  super(props);
	  
	  this.state = {
		  searchResults: [],
		  playlistName: 'New Playlist',
		  playlistTracks: []
		};

	  this.addTrack = this.addTrack.bind(this);
	  this.removeTrack = this.removeTrack.bind(this);
	  this.updatePlaylistName = this.updatePlaylistName.bind(this);
	  this.savePlaylist = this.savePlaylist.bind(this);
	  this.search = this.search.bind(this);
  }

  addTrack(track) {
    const contains = this.state.playlistTracks.includes(playlistTrack => {
        return playlistTrack.id === track.id
    });
    if(!contains) {
        let tracks = this.state.playlistTracks;
		tracks.push(track);
		this.setState({playlistTracks: tracks});
    }
  }
		
	removeTrack(track){
		let id = track.id;
		let currentPlaylistTracks = this.state.playlistTracks;
		let newPlaylist = currentPlaylistTracks.filter(song => song.id !== id);
		this.setState({
		  playlistTracks: newPlaylist
		});
    }
  
	updatePlaylistName(name) {
		this.setState({playlistName:name});
	}
	
	savePlaylist () {
		
		const trackURIs = this.state.playlistTracks.map(track => track.uri);
		
		Spotify.savePlaylist();
		this.setState({
			playlistName: 'New Playlist',
			searchResults: []
			});
	}
	
	search (term) {
	  Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });		
	}
  
  render() {
    return (
      <div>
		  <h1>Ja<span className="highlight">mmm</span>ing</h1>
		  <div className="App">
			<SearchBar onSearch = {this.search} />
			<div className="App-playlist">
			  <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
			  <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onNameChage = {this.state.updatePlaylistName}/>
			</div>
		  </div>
	  </div>
    );
  }
}

export default App;
