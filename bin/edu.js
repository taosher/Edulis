#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const colors = require('colors');
const _ = require('lodash');
const promptUtils = require('../scripts/promptUtils');
const buildComponent = require('../scripts/buildComponent');
// const config = require('../config/config');
const CONST = require('../config/const');
let options = {};
let key = '';
let promptQueue = [];

// try {
//    options = JSON.parse(config);
// } catch(e) {
//     console.log('Error: config error!');
//     return 1;
// }

program
    .version('0.0.1')
    // .option('-t --key','Set A Key')
    
program
    .action(() => {
        program.help();
        return ;
    })

program
    .command('component')
    .alias('com')
    .option('-k, --key [moduleType]', '模块类型')
    .description('Create A New Component')
    .action( option => {
        if (!!option.key) {
            console.log('tamplate key is:',option.key);
            key = option.key;
            promptQueue = promptUtils.updatePromptQueue(key);
            inquirer.prompt(promptQueue).then((ans) => {
                ans.key = key;
                buildComponent(ans);
            });
        } else {
            inquirer.prompt([promptUtils.initPromptQueue()]).then((ans) => {
                key = ans.key;
                inquirer.prompt(promptUtils.updatePromptQueue(key)).then((ans) => {
                    ans.key = key;
                    buildComponent(ans);
                })
            })
        }
    } )


program.parse(process.argv);