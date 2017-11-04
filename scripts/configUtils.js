const fs = require('fs');
const os = require('os');
const shell = require('shelljs');
const CONST = require('../config/const');
const homeDir = os.homedir();
const configPath = homeDir + '/.edu';

const isConfigExist = () => {
    console.log(1)
    return fs.existsSync(configPath);
}

const updateConfig = () => {
    console.log(2)
    console.log('-----------------------');
    console.log('Start Update:'.yellow);
    if (isConfigExist()) {
        shell.exec('rm -rf ' + configPath);
    }
    shell.exec('git clone ' + CONST.CONFIG_SOURCE + ' ' + configPath);
    console.log('Update End.'.yellow);
}

const getConfig = () => {
    console.log(3)
    if (isConfigExist()) {
        return require(configPath + '/config.json');    
    } else {
        console.log('No EDU-CLI Config File!'.yellow);
        console.log('Start Download The Latest EDU-CL Config:'.yellow);
        updateConfig();
        console.log('Config Downloaded!'.yellow);
        return require(configPath + '/config.json');
    }
}


module.exports = {
    isConfigExist,
    updateConfig,
    getConfig
}