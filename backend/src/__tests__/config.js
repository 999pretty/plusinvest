const config = { serverUrL: 'http://localhost:9090' };

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Using serverUrl:', config.serverUrL);

module.exports = config;
