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

const defaultConfig = require('../config/config.json')
const cwd = path.normalize(process.cwd())

let config = Object.create(null)

/**
 * get final configuration
 */
const getConfig = () => {
    if (!_.isEmpty(config)) {
        return config
    }
    const isGlobalConfigExist = fs.existsSync(configPath)
    const isWorkDirConfigExist = fs.existsSync(path.join(cwd,CONST.CONFIG_NAME))
    if (isGlobalConfigExist) {
        config = require(configPath)
    } else {
        console.log('No Global Configuration.'.yellow)
        config = initGlobalConfig()
    }
    if (isWorkDirConfigExist) {
        // load and merge workspace configuration
        const workConfigTemplates = getWorkConfig()
        config.templates = workConfigTemplates.concat(config.templates)
    }
    return config
}

/**
 * get workspace configuration
 */
const getWorkConfig = () => {
    let workConfig = require(path.join(cwd,CONST.CONFIG_NAME))

    //compatibility logic
    if (!_.isEmpty(workConfig.templates))
        workConfig = workConfig.templates

    //only templates can be merged.
    //hence it must be a array.
    if (!_.isArray(workConfig)) {
        console.log('Fail to parse configuration in work dictionary\n'.red)
        console.log('Please check the format of configuration'.red)
        return 
    }
    return workConfig
}

/**
 * initialize global edulis configuration
 */
const initGlobalConfig = () => {
    const defaultConfig = require('../config/config.json')
    console.log('\nApply Default Edulis Global Configuration...'.yellow)
    fs.writeFileSync(configPath,JSON.stringify(defaultConfig,null,4))
    return defaultConfig
}

/**
 * update global configuration
 */
const updateConfig = () => {
    initGlobalConfig()
    console.log('\nEdulis Global Configuration Updated!\n'.green)
}

module.exports = {
    getConfig,
    updateConfig
}