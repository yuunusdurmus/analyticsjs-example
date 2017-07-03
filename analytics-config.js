module.exports = {
  config: [
    {
      package: require('@segment/analytics.js-integration-google-analytics'),
      name: 'Google Analytics',
      settings: {
        trackingId: 'UA-XXXXXXXXX-X' 
      }
    }
  ]
}

