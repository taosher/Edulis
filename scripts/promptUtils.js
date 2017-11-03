const queueUtil = require('./queueUtil');
const options = require('../config/config');
const promptUtils = {

    initPromptQueue(key) {
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
            let item = queueUtil.findItemByKey(key);
            let params = item.params; 
            let tempArr = [];
            for (let param of params) {
                tempArr.push({
                    type: 'input',
                    name : param,
                    message : 'Input the component ' + param + ':',
                    validate: (value) => {
                        if (!value) {
                            return 'Empty input!';
                        }
                        return true;
                    }
                });
            }
            return tempArr;
        }
    }

}

module.exports = promptUtils;