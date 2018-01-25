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
const colors = require('colors');
module.exports = (option) => {
    if (!option.delete) {
        console.log('Delete Abort.'.red)
        return
    }
    shell.rm('-rf','./*');
    shell.rm('-rf','./.*');
    console.log('Current Dictionary Cleaned'.green);
}