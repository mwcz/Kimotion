#!/usr/bin/env python
# encoding: utf-8

from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter
import input
import logging
import signal
import sys

from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer


def get_args():
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)

    parser.add_argument('-d', '--debug', action='store_true', help='Turn on debug mode')

    return parser.parse_args()


def serve():

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


    def close_sig_handler(signum, frame):
        server.close()
        sys.exit()

    signal.signal(signal.SIGINT, close_sig_handler)
    server = SimpleWebSocketServer('0.0.0.0', 1337, InputServer)
    server.serveforever()


def main():
    args = get_args()
    loglevel = logging.DEBUG if args.debug else logging.WARNING
    logging.basicConfig(level=loglevel, format='%(levelname)s|%(asctime)s|%(module)s|%(funcName)s:  %(message)s')
    serve()

if __name__ == "__main__":
    main()
