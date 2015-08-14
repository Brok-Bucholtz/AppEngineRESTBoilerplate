exports.config = {
  directConnect: true,
  keepAlive: true,
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['e2e/*.e2e.js']
};
