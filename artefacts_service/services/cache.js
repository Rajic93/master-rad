const memjs = require('memjs')

const MEMCACHIER_SERVERS = 'mc4.dev.eu.ec2.memcachier.com'; //process.env.MEMCACHIER_SERVERS;
const EXPIRY_POLICY = 300; //process.env.CACHE_EXPITY_POLICY;
process.env.MEMCACHIER_USERNAME = 'B17FFB';
process.env.MEMCACHIER_PASSWORD = '7D31BA537282216F08F419EEB83B9466';

var mc = memjs.Client.create(MEMCACHIER_SERVERS, {
    failover: true,  // default: false
    timeout: 1,      // default: 0.5 (seconds)
    // keepAlive: true  // default: false
})  

const get = async (tag) => new Promise((resolve, reject) => {
    try {
        mc.get(tag, function(err, val) {
            if(err != null) {
              return reject(err)
            }
            //   resolve(val.toString('utf8'));
            return resolve(val);
          })
    } catch (cacheError) {
        return reject(cacheError);
    }
});
const set = async (tag, content) => new Promise((resolve, reject) => {
    try {
        mc.set(tag, content, { expires: EXPIRY_POLICY }, function(err) {
            if(err != null) {
              return reject('Error setting value: ' + err)
            }
            return resolve(EXPIRY_POLICY);
          })
    } catch (cacheError) {
        return reject(cacheError);
    }
});
const invalidate = async () => {
    try {
        console.log('Time to invalidate cache');
        mc.flush();
    } catch(flushingError) {
        console.log('Failed to flush CacheStorage', { flushingError });
    }
}

module.exports = { get, set, invalidate };