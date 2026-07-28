#!/usr/bin/env python3
"""简单 HTTP 服务器 - 用于 Vue 3 开发调试"""
import os
import sys
from http.server import SimpleHTTPRequestHandler
import socketserver

PORT = 5173

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def do_GET(self):
        if self.path.startswith('/api/'):
            self.path = '/api' + self.path[4:]
            return super().do_GET()
        if self.path == '' or self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("开发服务器运行在 http://localhost:" + str(PORT))
        print("目录: " + os.getcwd())
        httpd.serve_forever()
