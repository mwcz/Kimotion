import freenect
import logging
import numpy as np
from threading import Thread

MAXDEPTH = 1200


class KinectLoop(Thread):

    def __init__(self, server, **kwargs):
        super(KinectLoop, self).__init__(**kwargs)
        self.server = server
        self.killfreenect = False
        self.last_tilt = 0

    def body(self, dev, ctx):
        if self.killfreenect:
            raise freenect.Kill("Killing freenect runloop")
        if self.server.tilt is None or self.server.tilt == self.last_tilt:
            return
        else:
            freenect.set_tilt_degs(dev, self.server.tilt)
            self.last_tilt = self.server.tilt

    def kill(self):
        self.killfreenect = True

    def run(self):
        freenect.runloop(body=self.body, depth=createdepthhandler(self.server))


class KinectSubject(Thread):

    def __init__(self, max_depth=1200, observers=None, **kwargs):
        super(KinectSubject, self).__init__(**kwargs)
        self.max_depth = max_depth
        self.observers = observers if observers is not None else {}
        self.killfreenect = False
        self.last_tilt = 0
        self.tilt = 0
        self.depth = None

    def add_observer(self, oid, observer):
        self.observers[oid] = observer

    def body(self, dev, ctx):
        if self.killfreenect:
            raise freenect.Kill("Killing freenect runloop")
        if self.tilt != self.last_tilt:
            freenect.set_tilt_degs(dev, self.tilt)
            self.last_tilt = self.tilt

    def depth_handler(self, dev, depth, timestamp):
        depth[np.where(depth > self.max_depth)] = self.max_depth
        self.depth = bytearray(depth.flatten())
        for observer in self.observers.values():
            observer(self.depth)

    def kill(self):
        self.killfreenect = True

    def remove_observer(self, oid):
        try:
            del self.observers[oid]
        except KeyError:
            logging.warn("Could not find observer id {0}".format(oid))

    def run(self):
        freenect.runloop(body=self.body, depth=self.depth_handler)

    def set_tilt(self, degs):
        self.tilt = degs


class KinectFactory(object):

    KINECTSUBJECT = None

    @staticmethod
    def create_kinect(**kwargs):
        if KinectFactory.KINECTSUBJECT is None:
            KinectFactory.KINECTSUBJECT = KinectSubject(**kwargs)
            KinectFactory.KINECTSUBJECT.start()
        return KinectFactory.KINECTSUBJECT

    @staticmethod
    def kill():
        if KinectFactory.KINECTSUBJECT is not None:
            KinectFactory.KINECTSUBJECT.kill()


def createdepthhandler(server):
    def handledepth(dev, depth, timestamp):
        """Flatten the 2D depth array into a 1D array, convert it into a
        bytearray, and send it to the client."""

        # truncate at max_depth
        depth[np.where(depth > MAXDEPTH)] = MAXDEPTH

        # # gaussian blur the depth values
        # depth = filters.gaussian_filter(
        #     depth,
        #     sigma=3,
        #     mode='nearest'
        # )

        array1d = depth.flatten()
        barray = bytearray(array1d)
        server.sendMessage(barray)

    return handledepth


def startloop(server):
    freenect.runloop(
        depth=createdepthhandler(server)
    )
