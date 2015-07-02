import numpy as np
from matplotlib import pyplot
from matplotlib import animation
import pyaudio
import wave
from sys import byteorder
from array import array
from struct import pack

import time
import datetime, calendar
from datetime import timedelta

THRESHOLD = 500
CHUNK_SIZE = 1024
FORMAT = pyaudio.paInt16
RATE = 44100



class Listener:
    previous_peak = time.time()
    bpm = 120
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=1, rate=RATE,
      input=True, output=True,
      frames_per_buffer=CHUNK_SIZE)

    fig = pyplot.figure()
    ax = pyplot.axes(xlim=(0, 256), ylim=(0, 100))
    line, = ax.plot([], [], lw=2)

    def sound_init(self):
         self.line.set_data([], [])
         return self.line,

    def init(self):

      anim = animation.FuncAnimation(self.fig, self.animate, init_func=self.sound_init,
        frames=500, interval=20, blit=True)
      pyplot.show()

    def getdata(self):
      r = array('h')
      snd_data = array('h', self.stream.read(CHUNK_SIZE))
      if byteorder == 'big':
        snd_data.byteswap()
      r.extend(snd_data)
      sample_width = self.p.get_sample_size(FORMAT)
      data = r
      data = np.abs(np.fft.rfft(data))
      data = 10*np.log10(data)
      return data

    # animation function.  This is called sequentially
    def animate(self, i):

        current_time = time.time()
        y = self.getdata()
        x = len(y)
        x = range(0, x)
        maxy = max(y)
        peak = np.where(y == maxy)[0][0]
        diff = np.abs(current_time - self.previous_peak)
        if (peak > 5 and diff > 0.25):
          if (diff < 10):
            self.bpm = (1 / diff) * 60
            print self.bpm
          self.previous_peak = current_time


        self.line.set_data(x, y)
        return self.line,

