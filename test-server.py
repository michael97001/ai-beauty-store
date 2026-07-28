#!/usr/bin/env python3
"""簡易靜態文件服務器 - 用於開發測試"""
import http.server
import socketserver
import os

PORT = 5173
DIRECTORY = "src"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.abspath("."), *args, **kwargs)
    
    def do_GET(self):
        # 所有路由都返回 index.html（SPA 支持）
        if self.path == '' or self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 開發服務器運行在 http://localhost:{PORT}")
    print(f"📂 目錄: {os.getcwd()}")
    httpd.serve_forever()
