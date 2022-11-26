// 获取按钮元素
var openVedioBtn = document.getElementById("openVedioBtn");
var startRecordBtn = document.getElementById("startRecordBtn");
var stopRecordBtn = document.getElementById("stopRecordBtn");
var takePhotoBtn = document.getElementById("takePhotoBtn");

// 绑定点击事件
window.onload = () => {
  // 打开直播摄像头
  openVedioBtn.onclick = () => {
    openVedioBtn.setAttribute("disabled", true);
    startRecordBtn.setAttribute("disabled", true);
    takePhotoBtn.setAttribute("disabled", true);
    let vedioWindow = window.open("html/vedio_window.html", "_blank");
    // 消息监听器-监听来自子窗口的消息
    window.addEventListener("message", (msg) => {
      if (JSON.stringify(msg.data) != null) {
        if (vedioWindow != null) {
          vedioWindow.close();
          vedioWindow = null;
        }
        openVedioBtn.removeAttribute("disabled");
        startRecordBtn.removeAttribute("disabled");
        takePhotoBtn.removeAttribute("disabled");
      }
    });
  };
  // 录制视频
  startRecordBtn.onclick = () => {};
  // 结束录制
  stopRecordBtn.onclick = () => {};
  // 拍照
  takePhotoBtn.onclick = () => {
    openVedioBtn.setAttribute("disabled", true);
    startRecordBtn.setAttribute("disabled", true);
    takePhotoBtn.setAttribute("disabled", true);
    let photoWindow = window.open(
      "html/photo_window.html",
      "_blank",
      "width=300,height=300"
    );
    // 消息监听器-监听来自子窗口的消息
    window.addEventListener("message", (msg) => {
      if (JSON.stringify(msg.data) != null) {
        if (photoWindow != null) {
          photoWindow.close();
          photoWindow = null;
        }
        openVedioBtn.removeAttribute("disabled");
        startRecordBtn.removeAttribute("disabled");
        takePhotoBtn.removeAttribute("disabled");
      }
    });
  };
};
