#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */


const queryUtils = require('./queryUtils')
const options = require('./configUtils').getConfig()
const promptUtils = {
    /**
     * generate keys prompt queue
     */
    initPromptQueue() {
        let templates = options.templates
        let list = function *() {
            for (let i in templates) {
                yield {
                    name : templates[i].des,
                    value : templates[i].key
                }
            }
        }
        return {
            type : 'list',
            name : 'key',
            message : 'Choose a Component Template :',
            choices : [...list()]
        }
        
    },

    //@discard
    // updatePromptQueue(key) {
    //     if (!!key && (typeof key === 'string')) {
    //         let item = queryUtils.findItemByKey(key)
    //         let params = item.params 
            
    //     }
    // },

    /**
     * generate module prompt queue
     */
    modulePromptQueue() {
        return {
            type: 'input',
            name : 'module',
            message : 'Input the component module:',
            validate: (value) => {
                if (!value) {
                    return 'Empty input!'.red
                }
                return true
            }
        }
    },

    /**
     * generate params prompts queue
     * @param {object} item   config object
     */
    paramPromptQueue(item) {
        let tempArr = []
        for (let param of item.params) {
            // console.log(param,item)
            //if a param set before, continue
            if (!!item[param]) {
                // console.log(param,item[param])
                continue
            }
            tempArr.push({
                type: 'input',
                name : param,
                message : 'Input the component ' + param + ':',
                validate: (value) => {
                    if (!value) {
                        return 'Empty input!'.red
                    }
                    return true
                }
            })
        }
        return tempArr
    }


}

module.exports = promptUtils