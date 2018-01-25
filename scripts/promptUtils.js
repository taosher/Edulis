#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const queryUtils = require('./queryUtils');
const options = require('./configUtils').getConfig();
const promptUtils = {

    initPromptQueue() {
        let templates = options.templates;
        let list = function *() {
            for (let i in templates) {
                yield {
                    name : templates[i].des,
                    value : templates[i].key
                }
            }
        };
        return {
            type : 'list',
            name : 'key',
            message : 'Choose A Component Template U Want:',
            choices : [...list()]
        };
        
    },

    updatePromptQueue(key) {
        if (!!key && (typeof key === 'string')) {
            let item = queryUtils.findItemByKey(key);
            let params = item.params; 
            
        }
    },

    modulePromptQueue() {
        return {
            type: 'input',
            name : 'module',
            message : 'Input the component module:',
            validate: (value) => {
                if (!value) {
                    return 'Empty input!'.red;
                }
                return true;
            }
        }
    },

    paramPromptQueue(item) {
        let tempArr = [];
        for (let param of item.params) {
            tempArr.push({
                type: 'input',
                name : param,
                message : 'Input the component ' + param + ':',
                validate: (value) => {
                    if (!value) {
                        return 'Empty input!'.red;
                    }
                    return true;
                }
            });
        }
        return tempArr;
    }


}

module.exports = promptUtils;