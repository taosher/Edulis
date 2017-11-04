const options = require('./configUtils').getConfig();

module.exports = {
    findItemByKey(key) {
        let templates = options.templates;
        for (let item of templates) {
            if (item.key === key) {
                return item;
            }
        }
    }
}