var integration = require('@segment/analytics.js-integration');

module.exports = exports = function(analytics) {
  analytics.addIntegration(Custom);
};

var Custom = exports.Integration = integration('Custom Analytics')
    .tag('library', '<script id="hede" src="./custom-analytics.js">')


Custom.on('construct', function(integration){
  console.log('----',integration)
})

Custom.prototype.initialize = function() {
    console.log('custom library initialize =>', this, '\n\n\n');
    this.load('library', this.ready);
};

Custom.prototype.loaded = function() {
  return !!window.customAnalytics;
};

Custom.prototype.page = function() {

    console.log('=> page viewed action', '\n\n\n');

    this.pageCalled = true;
};

Custom.prototype.track = function(track, properties) {
    
    //all data
    console.log( 'data =>', track, '\n\n\n')

    //event name
    console.log( 'event name =>', track.event(), '\n\n\n')

    //event data
    console.log( 'category =>', track.category(), '\n\n\n')

};

Custom.prototype.orderCompleted = function(track) {
    console.log('========',track)
}
