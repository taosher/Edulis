#!/usr/bin/env node
'use strict'

/**
 * EDU-CLI 
 * Netease EDU Scaffolding Tool
 * 
 * @author chukuang(toolve@foxmail.com)
 * @version 1.0
 */

const program = require('commander')
const inquirer = require('inquirer')
const colors = require('colors')
const promptUtils = require('../scripts/promptUtils')
const queryUtils = require('../scripts/queryUtils')
const buildComponent = require('../scripts/buildComponent')
const deleteAll = require('../scripts/deleteAll')
const configUtils = require('../scripts/configUtils')
const CONST = require('../config/const')

let options = {}
let key = ''
let promptQueue = []


program
    .version('1.0.0')
    .usage('<command> [--option [value]]')

    
program
    .command('*')
    .description('help')
    .action(function() {
        program.help()
    })


program
    .command('component')
    .alias('com')
    .description('Build A New Component')
    .usage('[-k [key]] [-m [module]]')
    .option('-k, --key [componentKey]', 'Component Template Key')
    .option('-m, --module [componentModule]','Component Module Name')
    .action( (option) => {
        let item
        let keyFlag = false
        let conf = {}
        
        /**
         * initialize key
         */
        new Promise((resolve) => {
            //if no key in argv,call prompt
            if (!option.key) {
                new Promise((res) => res([promptUtils.initPromptQueue()]))
                .then(inquirer.prompt)
                .then((ans) => {
                    conf.key = ans.key
                    resolve(conf.key)
                })
            } else {
                //if there is a key in argv, set keyFlag true
                keyFlag = true
                conf.key = option.key
                resolve(conf.key)
            }
        })
        .then((key) => {
            item = queryUtils.findItemByKey(key)    //get config object by key
            if (!item) {
                console.log('Error: No matched key!'.red)
                console.log('Please Input a right template key!'.red)
                return 
            }
            if (!!item.module) {
                conf.module = item.module
            }
            return conf
        })
        .then((conf) => {
            if (!!option.module) {
                conf.module = item.module = option.module
            }
            return conf
        })
        .then((conf) => {
            return new Promise((resolve) => {
                //if there are params, call prompts
                if (!!item.params) {
                    new Promise((res) => res(promptUtils.paramPromptQueue(item)))
                    .then(inquirer.prompt)
                    .then((ans) => {
                        Object.keys(ans).forEach((k) => {
                            conf[k] = ans[k]
                        })
                        resolve(conf)
                    })
                } else {
                    resolve(conf)
                }
            })
        })
        .then((conf) => {
            console.log('\n--------------------------------------')
            //if keyFlag equals to true, 
            //which means a key has already been given with argv,
            //print the log below.
            if (keyFlag) {
                console.log('Build Template:'.green,item.des)
                console.log('Build Template Key:'.green,item.key)
            }
            buildComponent(conf)
        })
        .catch((e) => {
            // console.log('Error:'.red)
            // console.log(e)
        })
    } )

program
    .command('update')
    .description('Update Config')
    .action(() => {
        configUtils.updateConfig()
    })

program
    .command('delete')
    .description('Delete All Files in the Current Dictionary')
    .action(() => {
        inquirer.prompt([{
            type : 'confirm',
            name : 'delete',
            message : 'Delete All Files in the Current Dictionary?',
            default:false
        }]).then(deleteAll)
    })


program.parse(process.argv)