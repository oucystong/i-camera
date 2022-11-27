module.exports = {
  packagerConfig: {
    appVersion: "1.0.0", //版本号
    name: "ICamera", // 应用名称
    productName: "ICamera", // 产品名称
    appCopyright: "xiaotong(buaatys@163.com)", // 作者信息
    icon: "assets/camera", // 不需要加后缀名
    asar: true,
    packageManager: "npm",
    overwrite: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      config: {
        icon: "assets/camera.icns",
      },
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
