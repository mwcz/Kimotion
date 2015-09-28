import websockets from 'websockets';
import recording from 'recording';



var input_source = [websockets, recording][~~confirm('Ok for recording, Cancel for websockets')]();

export default input_source;
