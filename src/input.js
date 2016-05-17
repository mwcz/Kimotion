import kinect_ws from 'kinect-ws';
import kinect_recording from 'kinect-recording';
import leap_ws from 'leap-ws';

const datasources = [kinect_ws, kinect_recording, leap_ws];

var input_source = datasources[prompt('0 for Kinect recording, 1 for live Kinect, 2 for live Leap Motion')]();

export default input_source;
