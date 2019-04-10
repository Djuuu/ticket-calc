
process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    lintOnSave: false,

    transpileDependencies: [
        'vuex',
    ],

    pwa: {
        name:        'Ticket-Calc',
        themeColor:  '#E3001B',
        msTileColor: '#E3001B',

        appleMobileWebAppCapable:        'yes',
        appleMobileWebAppStatusBarStyle: 'default',

        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        }
    }
};
