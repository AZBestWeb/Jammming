let accessToken;
let accessTokenMatch;
let expiresInMatch;
const cliendID = "b74456e111a340f4b1d8f3974276bf7f";
const redirectURL = "http://localhost:3000/";

let Spotify = {	

	getAccessToken () {		
		if (accessToken) {
			return accessToken;
		} else {
			accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
			expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);		
			if (accessTokenMatch && expiresInMatch) {
				const expiresIn = Number(expiresInMatch[1]);
				accessToken = accessTokenMatch[1];
				window.setTimeout(() => accessToken = '', expiresIn * 1000);
				window.history.pushState('Access Token', null, '/'); 
				return accessToken;
			} else {
				window.location = `https://accounts.spotify.com/authorize?client_id=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
			}		
		}
	},	
	search (term) {
		accessToken = Spotify.getAccessToken();
		  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			  headers: {
				  Authorization: `Bearer ${accessToken}`
				  }
			  }).then(response => {
		  return response.json();
		}).then(jsonResponse => {
			if (!jsonResponse.tracks) {
				return [];
			} else {
				 return jsonResponse.tracks.items.map(track => ({
				  id: track.id,
				  name: track.name,
				  artist: track.artists[0].name,
				  album: track.album.name,
				  uri: track.uri
			}));
		  }
		});
	},

	savePlaylist (playListName, uris) {
		if (!playListName || !uris.length) {
			return;
		}
		accessToken = Spotify.getAccessToken();
		let userID;
		let headers = {
				  Authorization: `Bearer ${accessToken}`
				  };		
		return fetch('https://api.spotify.com/v1/me', {
			headers: headers
			}).then(response => response.json()).then(jsonResponse => {
				userID = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({name: playListName})
					}).then(response => response.json()).then(jsonResponse => {
							const playlistId = jsonResponse.id;
							return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks` ,{
								headers: headers,
								method: 'POST',
								body: JSON.stringify({uris: uris})
								})
						})	  
				});					
	  }
};
export default Spotify;
