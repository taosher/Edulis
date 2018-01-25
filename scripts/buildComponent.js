#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const shell = require('shelljs');
const options = require('./configUtils').getConfig();

module.exports = (conf) => {
    let key = conf.key;
    let startTime,endTime;
    startTime = (new Date()).getTime();
    console.log('Start Build Component: '.green + conf.name);
    delete conf.key;
    let params = () => {
        let tempArr = [];
        for (let k in conf) {
            tempArr.push('-' + k);
            tempArr.push(conf[k]);
        }
        return tempArr;
    }
    let cmd = [options.prefix,key,...params()].join(' ');
    shell.exec(cmd);
    console.log('--------------------------------------');
    console.log('Build End.'.green);
    endTime = (new Date()).getTime();
    console.log(('Component built in ' + (endTime - startTime) + 'ms').green);
}