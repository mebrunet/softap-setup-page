import SimpleHTTPServer
import SocketServer
import os

PORT = 8000
STATIC_DIR = "src"

os.chdir(STATIC_DIR)
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)
print ("Serving at http://localhost:".format(PORT))
httpd.serve_forever()
