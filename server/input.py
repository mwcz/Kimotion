import freenect
from threading import Thread

last_tilt = 0

class KinectLoop(Thread):

    def __init__(self, server, **kwargs):
        super(KinectLoop, self).__init__(**kwargs)
        self.server = server
        self.killfreenect = False

    def body(self, dev, ctx):
        global last_tilt
        if self.killfreenect:
            raise freenect.Kill("Killing freenect runloop")
        if (self.server.tilt is None or self.server.tilt == last_tilt):
            return
        else:
            freenect.set_tilt_degs(dev, self.server.tilt)
            last_tilt = self.server.tilt

    def kill(self):
        self.killfreenect = True

    def run(self):
        freenect.runloop(body=self.body, depth=createdepthhandler(self.server))


def createdepthhandler(server):
    def handledepth(dev, depth, timestamp):
        """Flatten the 2D depth array into a 1D array, convert it into a
        bytearray, and send it to the client."""
        shadow_average(depth)
        array1d = depth.flatten()
        barray = bytearray(array1d)
        server.sendMessage(barray)

    return handledepth

def shadow_average(depth):
    k = 3 # kernel size
    r = (k-1)/2 # kernel radius

    for y in range(len(depth)): # loop over y
        for x in range(len(depth[0])): # loop over x
            d = depth[y][x]
            if d == 2047:
                a = 0
                dc = 0 # depth count, how many pixels were used for the average
                # loop over kernel
                for ky in range(y-r, y+r):
                    for kx in range(x-r, x+r):
                        try:
                            kd = depth[ky][kx] # kernel depth value

                            # only use it if it isn't 2047
                            if kd != 2047:
                                dc += 1
                                a += kd
                        except: pass
                if dc > 0: # only average if some pixels were found
                    a /= dc
                    depth[y][x] = a

def startloop(server):
    freenect.runloop(
        depth=createdepthhandler(server)
    )
