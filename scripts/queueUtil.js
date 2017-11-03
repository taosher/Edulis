const config = require('../config/config.json');
const option = JSON.parse(config);

module.exports = {
    findItemByKey(key) {
        let templates = option.templates;
        for (let item of templates) {
            if (item.key === key) {
                return item;
            }
        }
    }
}