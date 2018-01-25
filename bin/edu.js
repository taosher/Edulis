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
    .version('0.0.1')
    .usage('component [-k [componentKey]]')
    
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
    .option('-k, --key [componentKey]', 'Component Template Key')
    .option('-m, --module [componentModule]','Component Module Name')
    .action( option => {
        if (!!option.key) {
            let item = queryUtils.findItemByKey(option.key)
            if (!item) {
                console.log('Error:'.red)
                console.log('No matched key!'.red)
                return 
            }
            console.log('template name is:'.green , item.des)
            console.log('template key is:'.green , option.key)
            key = option.key
            promptQueue = promptUtils.updatePromptQueue(key)
            inquirer.prompt(promptQueue).then((ans) => {
                ans.key = key
                return ans
            })
            .then(buildComponent)
            .catch((e) => {
                console.log('Error:'.red)
                console.log(e)
            })
        } else {
            inquirer.prompt([promptUtils.initPromptQueue()]).then((ans) => {
                key = ans.key
                inquirer.prompt(promptUtils.updatePromptQueue(key)).then((ans) => {
                    ans.key = key
                    buildComponent(ans)
                })
            }).catch((e) => {
                console.log('Error:'.red)
                console.log(e)
            })
        }
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