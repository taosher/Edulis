#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const options = require('./configUtils').getConfig();

module.exports = {
    /**
     * get template configuration by id
     * @param {string} key 
     */
    findItemByKey(key) {
        let templates = options.templates;
        for (let item of templates) {
            if (item.key === key) {
                return item;
            }
        }
    }
}