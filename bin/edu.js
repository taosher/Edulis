#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const colors = require('colors');
const _ = require('lodash');
const promptUtils = require('../scripts/promptUtils');
const config = require('../config/config.json');
const CONST = require('../config/const');
let options;
let promptQueue = [];

try {
   options = JSON.parse(config);
} catch(e) {
    console.log('Error: config error!');
    return 1;
}

program
    .version('0.0.1')
    .option('-t --key','Set A Key')
    


program
    .command('component')
    .alias('com')
    .description('Create A New Component')
    .action( option => {
        if (typeof option !== 'string' || !option) {
            program.help();
            return ;
        }
        if (!!program.key) {
            promptQueue = promptUtils.initPromptQueue(program.key);
        }
    } )


program.parse(process.argv);