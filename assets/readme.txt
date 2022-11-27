1、更换图标
设计图标
导出png格式的图标（PS不支持ico和icns格式）1024*1024
以Mac应用为例，转换为icns图标：https://cloudconvert.com/png-to-icns
拷贝图标到项目路径下，不要修改后缀名
修改forge.config.js文件，修改内容如下：
  packagerConfig: {
    icon: "assets/icon", // 不需要加后缀名，forge会自动加
  },
修改成功 发布即可







