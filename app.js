//app.js
App({
  onLaunch() {
    //serviceAPIs.login();
  },
  globalData: {
    sysConfig: {
      companyId: 8,
      // apiBaseUrl:'http://192.168.0.4:8080/core/api/wechat/',
      // imgBaseUrl: 'http://192.168.0.4:8080/',
      // webBaseUrl: 'http://192.168.0.4:8080/core/',

      apiBaseUrl: 'https://easybox.100tun.com/api/wechat/',
      imgBaseUrl: 'https://easybox.100tun.com/',
      webBaseUrl: 'https://easybox.100tun.com/',
    },
    requestUrls: {
      loginSystem: 'login.do',
      bindSysUserToCustomer: 'socialUser/bind.do',

      deviceStateValue: 'device/stateValue.do',

      customerBoxDetail: 'box/info/{1}.do',
      userHaveBoxControlDataEditRight: '/box/{1}/ctrcfg/data/editRight.do',
      boxControlConfigData: 'box/ctrcfg/data/{1}.do',
      boxControlConfigDataUpdate: 'box/ctrcfg/updateData.do',

      saveEasyboxDataCurrent: 'box/ctrcfg/data/change.do',
      getBoxHeartbeatLastUpdateInterval: 'box/{1}/heartbeat/lastUpdateInterval.do',

    },
    wxLoginCode: null,
    appTypeId: 'szdeyu',
    customerInfo: {}, //微信账号用户信息

    sysLoginRes: {
      accessToken: '',//我们系统的访问凭证，会过期
      wechatOpenId: '',
      wechatSessionKey: '',

      bindSysUserId: 0, //微信账号用户绑定的系统用户id
      userCompanyId: 0, //绑定的系统用户对应的公司id
      bindSysUserName: '', //微信账号用户绑定的系统用户id
      bindSysUserEmail: '', //绑定的系统用户对应的公司id

      insideSocialUserId: ''//我们系统内部微信账号用户ID
    },
    //系统登录成功后设置本地设置
    setLoginSuccessInfo: function (loginResult) {
      this.isLogin = loginResult ? true : false;
      this.sysLoginRes = loginResult;
    },
    isLogin: false,
    userInfo: null
  },
  langConfig: {
    en: {
      homePageTitle: 'Home - OKLIN',
      homeAddress: 'Addr：Flat H, 12/F, Imperial Building, 54-56 Canton Road, T.S.T., Kowloon, Hong Kong',
      homeTel: 'Tel：020-85647066',

      panelPageTitle: 'Device Status',
      panelMachine: 'machine',
      panelOilTemp: 'Oil Temp',
      panelCylinTemp: 'Cylin Temp',
      panelHumidity: 'Humidity',
      panelRunFlag: 'Run',
      panelEnergySaveFlag: 'EngySave',
      panelAlarmFlag: 'Alarm',
      panelEngineForward: 'EngFwa',
      panelEngineReversal: 'EngRev',
      panelFanHigh: 'FanHigh',
      panelFanMiddle: 'FanMid',
      panelFanSlow: 'FanSlow',
      panelEnterOpen: 'EntOpen',
      panelOuterOpen: 'OutOpen',
      panelHeatingFlag: 'Heat',
      panelBalanceFault: 'BalFault',
      panelManualAuto: 'Man/Auto',

      settPageTitle: 'Setting',

      settRemoteStop: 'Remote Stop',
      settRemoteStopStatus: 'Current',
      settRemoteStopY: 'Stop',
      settRemoteStopN: 'Run',
      settMaxDisconnectTime: 'Max disconnet time',
      settHour: 'Hour',
      settMinute: 'Minute',
      settMissHeatbeetTime: 'Disconnet time',
      settSwitchSysUserBind: 'Switch User',
    },
    cn: {
      homePageTitle: 'OK',
      homeAddress: '地址：',
      homeTel: '电话：020-',

      panelPageTitle: '设备状态',
      panelMachine: '号机',
      panelOilTemp: '油温',
      panelCylinTemp: '缸温',
      panelHumidity: '湿度',
      panelRunFlag: '运行指示',
      panelEnergySaveFlag: '节能指示',
      panelAlarmFlag: '报警指示',
      panelEngineForward: '主机正转',
      panelEngineReversal: '主机反转',
      panelFanHigh: '风机高速',
      panelFanMiddle: '风机中速',
      panelFanSlow: '风机低速',
      panelEnterOpen: '入料门开',
      panelOuterOpen: '出料门开',
      panelHeatingFlag: '加热指示',
      panelBalanceFault: '平衡器故障',
      panelManualAuto: '手动/自动',

      settPageTitle: '参数配置',

      settRemoteStop: '启动远程停机',
      settRemoteStopStatus: '当前',
      settRemoteStopY: '停止',
      settRemoteStopN: '运行',
      settMaxDisconnectTime: '最长允许断网时间',
      settHour: '时',
      settMinute: '分',
      settMissHeatbeetTime: '持续未收到设备心跳时间',
      settSwitchSysUserBind: '切换登录用户',
    },
  },
  currentLang: null,
  getCurrentLang() {
    if (this.currentLang) {
      return this.currentLang;
    }
    return this.langConfig.cn;
  },
  setCurrentLang(lang) {
    var cur = this.langConfig[lang];
    this.currentLang = cur ? cur : (this.langConfig['cn']);
  },
  getOpenId() {
    return this.globalData.sysLoginRes.wechatOpenId;
  },
  getWechatUserName: function () {
    var usr = this.globalData.userInfo;
    return usr ? usr.nickName : '';
  },
  getWechatUserAvatarUrl: function () {
    var usr = this.globalData.userInfo;
    return usr ? usr.avatarUrl : '';
  },
  getSessionKey() {
    return this.globalData.sysLoginRes.wechatSessionKey;
  },
  getAppAccessToken() {
    return this.globalData.sysLoginRes.accessToken;
  },
  getAppCustomerID() {
    return this.globalData.sysLoginRes.insideCustomerId;
  },
  getBindSysUserName() {
    return this.globalData.sysLoginRes.bindSysUserName;
  },
  isSysUserLogin() {
    return this.globalData.sysLoginRes.bindSysUserId > 0;
  },
  getAppSocialUserID: function () {
    return this.globalData.sysLoginRes.insideSocialUserId;
  },
  getAppSocialUserName: function () {
    return this.globalData.sysLoginRes.bindSysUserName;
  },
  getAppSocialUserCompanyId: function () {
    return this.globalData.sysLoginRes.userCompanyId;
  },
  getAppSocialUserEmail: function () {
    return this.globalData.sysLoginRes.bindSysUserEmail;
  },
})
