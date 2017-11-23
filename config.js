var config = {
    development: {
        port: 4501,
        domain: 'http://localhost:4501',
    },
    production: {
        port: 4501,
        domain: 'http://zhangdong.fongwell.com',
    },
    prodtest: {
        port: 4501,
        domain: 'http://localhost:4501',
    },
};
var envbuild = 'development';
if (process.env.config_env) {
    envbuild = process.env.config_env;
} else {
    if (process.argv.length > 2) {
        for (var i in config) {
            if (process.argv.indexOf(i) !== -1) {
                envbuild = i;
                break;
            }
        }
    }
}

var toUse = config[envbuild];
console.log('配置环境:' + envbuild);
module.exports = toUse;