module.exports = {
  packagerConfig: {
    appVersion: "1.0.0", //版本号
    name: "ICamera", // 应用名称
    appCopyright: "xiaotong(buaatys@163.com)", // 作者信息
    icon: "assets/logo.ico",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
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
