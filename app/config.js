/**
 * Created by samiyuru on 4/4/14.
 */
var config = {
    local: {
        mode: 'local',
        mongo: 'mongodb://localhost/kexchange',
        port: 3000
    },
    production: {
        mode: 'production',
        mongo: 'mongodb://localhost/kexchange',
        port: 5000
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}