module.exports = {
    config: [
        {
            package: require('./adapter-example/index'),
            name: 'Test',
            settings: {
              trackingId: 'UA-XXXXXXXXX-X' 
            }
        }
    ]
}

