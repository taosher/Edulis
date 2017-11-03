const shell = require('shelljs');
const options = require('../config/config');
module.exports = (option) => {
    let key = option.key;
    console.log('Start Build Component ' + option.name);
    delete option.key;
    let params = () => {
        let tempArr = [];
        for (let k in option) {
            tempArr.push('-' + k);
            tempArr.push(option[k]);
        }
        return tempArr;
    }
    let cmd = [options.prefix,key,...params()].join(' ');
    console.log('cmd',cmd)
    shell.exec(cmd);
    console.log('Build End.')
}