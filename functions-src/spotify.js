/* eslint-disable no-console */
const Spotify = require('node-spotify-api');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
});

const playlist = process.env.SPOTIFY_PLAYLIST;
const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function(event, context, callback) {
  // Run Spotify API Query
  spotify
    .request(`https://api.spotify.com/v1/playlists/${playlist}`)
    .then(data => {
      const filtered = data.tracks.items.reduce((acc, i) => {
        if (i.track.preview_url !== null) acc.push(i);
        return acc;
      }, []);
      const item = filtered[Math.floor(Math.random() * filtered.length)];
      const { name, preview_url, artists, album, href } = item.track;
      const response = { name, preview_url, artists, album, href };
      console.log(
        `${filtered.length} tracks returned.  Selected "${name}" by ${artists[0].name}.`
      );
      // Send successful data back
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify(response),
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ error: err }),
      });
    });
};
