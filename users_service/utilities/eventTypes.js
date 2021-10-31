const avsc = require('avsc');

const NEW_USER_TEMP_CLUSTER = avsc.Type.forSchema({
    type: 'record',
    fields: [
        { name: 'age', type: 'int' },
        { name: 'lat', type: 'float' },
        { name: 'lng', type: 'float' },
        { name: 'id', type: 'int' },
    ],
})

module.exports = { NEW_USER_TEMP_CLUSTER };