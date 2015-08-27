mporerver.py
t SocketServer
import BaseHTTPServer
import json

PORT = 9090

recordings = ['recording01', 'recording02', 'recording03']

def get_playlist():
    """ sample function to be called via a URL"""
    return json.dumps( recordings )

def play(recording):
    print('PLAY: %s at index %d' % (recording, recordings.index(recording)))

class KimotionRestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/play':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            try:
                play(post_body)
                self.send_response(200)
                self.send_header('Content-type','text/plain')
                self.end_headers()
                self.wfile.write('200: Playing recording')
            except Exception, e:
                self.send_response(500)
                self.send_header('Content-type','text/plain')
                self.end_headers()
                self.wfile.write('500: Invalid recording')
                raise e
            return
    def do_GET(self):
        if self.path == '/playlist':
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write(get_playlist()) #call sample function here
            return

httpd = SocketServer.ThreadingTCPServer(('localhost', PORT),KimotionRestHandler)

print "serving at port", PORT
httpd.serve_forever()
