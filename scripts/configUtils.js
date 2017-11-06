const fs = require('fs');
const os = require('os');
const path = require('path');
const shell = require('shelljs');
const colors = require('colors');
const CONST = require('../config/const');
const homeDir = os.homedir();
const configPath = path.join(homeDir,'.edu');
const configPath2 = path.join(homeDir,'edu-cli-config');

const isConfigExist = () => {
    return fs.existsSync(configPath);
}

const updateConfig = () => {
    console.log('-----------------------');
    console.log('Start Update:'.yellow || 'Start Update:');
    if (isConfigExist()) {
        shell.exec('rm -rf ' + configPath);
    }
    shell.exec('git clone ' + CONST.CONFIG_SOURCE + ' ' + configPath2);
    console.log(configPath2);
    shell.exec('mv -f '+ configPath2 + ' ' + configPath);
    console.log('Update End.'.yellow || 'Update End.');
}

const getConfig = () => {
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