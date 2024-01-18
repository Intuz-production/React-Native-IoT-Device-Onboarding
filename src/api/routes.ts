
export const routes = {
    login: 'account/login',
    register: 'account/register',
    forgot: 'account/forgot-password',
    updateProfile: 'account/details',
    refreshToken: 'account/refresh',
    changePassword: 'account/change-password',
    verifyOtp: 'account/verify-otp',
    resendOtp: 'account/resend-otp',
    updatePushToken: 'account/device-tokens',
    deleteAccount: '/account/delete-account-confirmation',
  
    //cms
    terms: 'cms/toc/get-latest',
    ledcodes: 'cms/led-codes',
    systemLinks: 'cms/system-links',
    tutorials: 'cms/tutorials/',
    infoTags: 'cms/info-tags/',
  
    //report
    report: 'account/get-report',
  
    countries: 'basics/countries',
    timeZones: 'basics/timezones',
  
    //Devices
    userDevices: 'devices/user-devices',
    authorizedUesrs: 'devices/user-devices/my-auth-users',
    relays: 'devices/relays',
    schedules: 'devices/schedules',
    models: 'devices/models',
    types: 'devices/types',
    configuration: 'devices/configurations',
    firmwareUpdates: 'devices/firmwares/device-fw-updates',
    deviceSchedules: 'devices/schedules/all', //Device Schedules
  
    //General
    general: 'general/endpoint',
    notifications: 'general/notifications',
    emailForHelp: 'general/feedbacks', //help
    master: 'general/master',
  
    //Onboarding
    getMacAddress: 'getmac',
    getInfo: 'info',
    getProvState: 'getProvState',
    scanWifi: 'provCMD',
    getAPList: 'scanlist',
    wifiCredentials: 'wificred',
    endpoint: 'endpoint',
    reboot: 'reboot',
  };
  