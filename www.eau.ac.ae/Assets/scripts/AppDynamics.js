//<!---AppDynamics Configuration---!>

window['adrum-start-time'] = new Date().getTime();
(function (config) {
    config.appKey = 'EC-AAB-RCX'; //Staging Key
    config.adrumExtUrlHttp = 'http://cdn.appdynamics.com';
    config.adrumExtUrlHttps = 'https://cdn.appdynamics.com';
    config.beaconUrlHttp = 'http://fra-col.eum-appdynamics.com';
    config.beaconUrlHttps = 'https://fra-col.eum-appdynamics.com';
    config.resTiming = { 'bufSize': 200, 'clearResTimingOnBeaconSend': true };
    config.maxUrlLength = 512;
    config.page = { 'captureTitle': true };
    config.fetch = true;
})(window['adrum-config'] || (window['adrum-config'] = {}));

//<!---End ofAppDynamics Configuration---!>
