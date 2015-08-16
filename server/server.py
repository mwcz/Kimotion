#!/usr/bin/env python
# encoding: utf-8

from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter
from input import KinectFactory
import logging
import signal
import sys
import uuid

from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer


def get_args():
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)

    parser.add_argument('-d', '--debug', action='store_true', help='Turn on debug mode')

    return parser.parse_args()


def serve():

    '''
    class InputServer(WebSocket):
        tilt = 0
        def __init__(self, *args, **kwargs):
            super(InputServer, self).__init__(*args, **kwargs)
            self.runloop = None

        def handleConnected(self):
            print(self.address, 'connected')
            self.runloop = input.KinectLoop(self)
            self.runloop.start()

        def handleClose(self):
            self.runloop.kill()
            print(self.address, 'closed')

        def handleMessage(self):
            self.tilt = int(float(self.data))
    '''
    class InputServer(WebSocket):

        def __init__(self, *args, **kwargs):
            super(InputServer, self).__init__(*args, **kwargs)
            self.kinect = None
            self.oid = None

        def handleConnected(self):
            print self.address, 'connected'
            self.kinect = KinectFactory.create_kinect()
            self.oid = uuid.uuid1()
            self.kinect.add_observer(self.oid, self.send_depth)

        def handleClose(self):
            self.kinect.remove_observer(self.oid)
            print self.address, 'closed'

        def handleMessage(self):
            degs = int(float(self.data))
            self.kinect.set_tilt(degs)

        def send_depth(self, depth):
            self.sendMessage(depth)

    def close_sig_handler(signum, frame):
        server.close()
        KinectFactory.kill()
        sys.exit()

    signal.signal(signal.SIGINT, close_sig_handler)
    server = SimpleWebSocketServer('0.0.0.0', 1337, InputServer)
    server.serveforever()


def main():
    print 'starting server'
    args = get_args()
    loglevel = logging.DEBUG if args.debug else logging.WARNING
    logging.basicConfig(level=loglevel, format='%(levelname)s|%(asctime)s|%(module)s|%(funcName)s:  %(message)s')
    serve()

if __name__ == "__main__":
    main()
