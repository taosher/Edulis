#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const shell = require('shelljs')
const options = require('./configUtils').getConfig()

/**
 * Trans config to cli command
 * @param {object} conf 
 */
module.exports = (conf) => {
    let key = conf.key
    let startTime = (new Date()).getTime()
    console.log('Start Build Component: '.green + conf.name + '\n')
    delete conf.key
    let params = () => {
        let paramList = []
        for (let k in conf) {
            paramList.push('-' + k)
            paramList.push(conf[k])
        }
        return paramList
    }
    let cmd = [options.prefix,key,...params()].join(' ')
    shell.exec(cmd)
    console.log('--------------------------------------')
    console.log('Build End.'.green)
    let endTime = (new Date()).getTime()
    console.log(('Project built in ' + (endTime - startTime) + 'ms').green)
}