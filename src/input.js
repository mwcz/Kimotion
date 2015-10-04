// import websockets from 'websockets';
import recording from 'recording';

// var input_source = [websockets, recording][~~confirm('Ok for recording, Cancel for websockets')]();
var input_source = recording();

export default input_source;
