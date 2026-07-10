# -*- coding: utf-8 -*-

import os

# 指定文件路径
file_path = "/sdcard/Android/data/com.netease.x19/files/resources/my_output.txt"

# 写入内容
try:
    with open(file_path, "w") as f:
        f.write("这是写入文件的示例内容。\n")
        f.write("Hello from Python!\n")
    print("写入成功:", file_path)
except Exception as e:
    print("发生错误:", e)
