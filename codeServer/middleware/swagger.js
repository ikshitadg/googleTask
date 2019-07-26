
const inert = require('inert');
const vision = require('vision');

const swagger = {
    register: require('hapi-swagger'),
    'options': {
        grouping: 'tags',
        payloadType: 'form'
    }
}


module.exports = { inert, vision, swagger};