#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const fs = require('fs')
const os = require('os')
const path = require('path')
const shell = require('shelljs')
const colors = require('colors')
const _ = require('lodash')
const CONST = require('../config/const')
const homeDir = os.homedir()
const configPath = path.join(homeDir,CONST.CONFIG_NAME)
// const originPath = path.join(homeDir,'edu-cli-config')

const defaultConfig = require('../config/config.json')
const pwd = path.normalize(process.cwd())
const isGlobalConfigFileExist = fs.existsSync(configPath)
const isGlobalConfigExist = isGlobalConfigFileExist 
        ? (!!require(configPath)[CONST.CONFIG_NAME_SPACE]) 
        : false
const isWorkDirConfigFileExist = !!require(path.join(pwd,CONST.CONFIG_NAME)) 


let content = {}
content[CONST.CONFIG_NAME_SPACE] = defaultConfig

let globalConfig = workConfig = finalConfig = {}

/**
 * check if config file exists
 */
// const initConfig = () => {
//     const isGlobalConfigFileExist = fs.existsSync(configPath)
//     const isGlobalConfigExist = isGlobalConfigFileExist 
//         ? (!!require(configPath)[CONST.CONFIG_NAME_SPACE]) 
//         : false
//     const isWorkDirConfigFileExist = 
//     return fs.existsSync(configPath)
// }

/**
 * update global config file
 */
const updateConfig = () => {
    console.log('-----------------------')
    console.log('Start Update:'.yellow || 'Start Update:')
    if (isConfigExist()) {
        shell.rm('-rf',configPath)
    }
    shell.exec('git clone ' + CONST.CONFIG_SOURCE + ' ' + originPath)
    console.log(originPath)
    shell.mv('-f',originPath,configPath)
    // shell.exec('mv -f '+ originPath + ' ' + configPath)
    console.log('Update End.'.yellow)
    console.log('-----------------------\n')
}

/**
 * get config
 */
const getConfig = () => {
    let globalConfigFile = fs.openSync(configPath,"wx"),
        workConfigFile
    if (!isGlobalConfigFileExist) {
        fs.writeFileSync(globalConfigFile,JSON.stringify(content))
    } else if (isGlobalConfigExist) {
        let globalConfigContent = require(configPath)
        globalConfigContent[CONST.CONFIG_NAME_SPACE] = defaultConfig
        fs.writeFileSync(globalConfigFile,JSON.stringify(globalConfigContent))
    } else {

    }

    // if (isConfigExist()) {
    //     return require(configPath + '/config.json')    
    // } else {
    //     console.log('No Global EDU-CLI Config File!'.yellow)
    //     console.log('Start Download The Latest EDU-CLI Config:'.yellow)
    //     updateConfig()
    //     console.log('Config Downloaded!'.yellow)
    //     return require(configPath + '/config.json')
    // }
}


module.exports = {
    isConfigExist,
    updateConfig,
    getConfig
}