const queueUtil = require('./queueUtil');

const promptUtils = {

    initPromptQueue() {

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
                    message : 'Input the ' + param + ':',
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