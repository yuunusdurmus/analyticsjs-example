module.exports = {
    config: [
        {
            package: require('./adapter-example/index'),
            name: 'Custom Analytics',
            settings: {
              trackingId: 'UA-XXXXXXXXX-X' 
            }
        }
    ]
}

