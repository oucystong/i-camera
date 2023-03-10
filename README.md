# ICamera

<div align=center>
  <img src="./assets/camera.png" width="100" height="100" alt="笔记图标" style="zoom: 100%;" />
</div>

### 关于我

[![bilibili](https://img.shields.io/badge/B%E7%AB%99-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%B0%8F%E4%BD%9F-white?logo=bilibili&labelColor=FE7398&color=00aeec&logoColor=white)](https://space.bilibili.com/52459877)

[![zhihu](https://img.shields.io/badge/%E7%9F%A5%E4%B9%8E-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%B0%8F%E4%BD%9F-white?logo=zhihu&labelColor=0066ff&color=142026&logoColor=white)](https://www.zhihu.com/people/xt-zhihu)

[![juejin](https://img.shields.io/badge/%E6%8E%98%E9%87%91-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%B0%8F%E4%BD%9F-blue?logo=bytedance&labelColor=3C8CFF&color=E9FF4F&logoColor=white)](https://juejin.cn/user/2884716887282798)

[![gitee](https://img.shields.io/badge/%E7%A0%81%E4%BA%91-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%B0%8F%E4%BD%9F-green?logo=gitee&labelColor=C71C23&color=222C32&logoColor=white)](https://gitee.com/xt-gitee)

### 介绍

**纯净且实用**的电脑摄像头小工具，主要解决以下痛点：

* 固定在桌面的**圆形直播摄像头**
* 个人介绍**视频录制**
* 个人**证件照拍摄**

软件截图：

![](./demo/软件截图.png)



### 软件架构
* `Electron`、`Html`、`Css`、`JavaScript`

### 安装教程

#### 编译安装

项目基于`Electron`构建，可以下载源码独立编译，以`Mac`为例，其编译过程如下：

```shell
# 克隆源码
git clone https://gitee.com/xt-gitee/icamera.git
# 切换目录
cd icamera
# 安装依赖
npm install
# 直接运行项目
npm run dev
# 编译打包项目
npm run make
# 编译后的应用在项目的out目录下
out
├── ICamera-darwin-x64
│   ├── ICamera.app
│   ├── LICENSE
│   ├── LICENSES.chromium.html
│   └── version
└── make
    └── zip
```

将应用直接拖拽到应用程序即可。

>* 需要授予系统的摄像头权限
>* 需要本地机器有`Node.js`、`npm`、`Git`环境

#### 直接安装【推荐】

* `Mac`用户
  * 下载链接：https://gitee.com/xt-gitee/icamera/releases/tag/v1.0.0
  * `解压软件->拖拽软件到应用程序->点击软件->进入系统偏好设置->安全性与隐私->仍然打开`
  * 退出软件：`Command+Q`

* `Windows`用户
  * 暂未编译

* `Linux`用户
  * 暂未编译

### 使用说明

#### 打开直播摄像头

![](./demo/打开直播摄像头.gif)

>使用说明：
>
>* 鼠标右键单击是暂停/开始直播摄像头
>* 鼠标左键双击是退出直播摄像头

#### 录像

![录像](./demo/录像.gif)

> 使用说明：
>
> * 鼠标右键单击是暂停/继续录制
> * 鼠标左键双击是保存录像并退出录像

#### 照相

![照相](./demo/拍照.gif)

>使用说明：
>
>* 鼠标右键单击是拍照并保存
>* 鼠标左键双击是退出拍照

### 参与贡献

* 提交`issue`
* 提交`pr`


### 未来特性更新

- [ ] 自动更新机制
- [ ] 更换视频背景
- [ ] 视频背景虚化
- [ ] 视频和照片保存的时候镜像
- [ ] 编译`Windows`和`Linux`端
- [ ] 多个摄像头可以支持选择切换
- [ ] 优化软件包的大小
- [ ] 画面调节【亮度、饱和度】
- [ ] 美颜功能
- [x] 圆形摄像头、录像、拍照功能的暂停状态、重新录制状态、退出状态等发送系统通知，具体如下

| 功能       | 功能状态通知                                         |
| ---------- | ---------------------------------------------------- |
| 直播摄像头 | 暂停直播状态通知、继续直播状态通知、退出直播状态通知 |
| 录像       | 暂停录像状态通知、继续录像状态通知、退出录像状态通知 |
| 拍照       | 退出拍照状态通知                                     |

