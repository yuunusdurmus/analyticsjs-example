var integration = require('@segment/analytics.js-integration');

module.exports = exports = function(analytics) {
  analytics.addIntegration(Custom);
};

var Custom = exports.Integration = integration('Custom Analytics')
 .readyOnLoad()
  .global('ga')
  .global('gaplugins')
  .global('_gaq')
  .global('GoogleAnalyticsObject')
  .option('anonymizeIp', false)
  .option('classic', false)
  .option('contentGroupings', {})
  .option('dimensions', {})
  .option('domain', 'auto')
  .option('doubleClick', false)
  .option('enhancedEcommerce', false)
  .option('enhancedLinkAttribution', false)
  .option('ignoredReferrers', null)
  .option('includeSearch', false)
  .option('setAllMappedProps', true)
  .option('metrics', {})
  .option('nonInteraction', false)
  .option('sendUserId', false)
  .option('siteSpeedSampleRate', 1)
  .option('sampleRate', 100)
  .option('trackCategorizedPages', true)
  .option('trackNamedPages', true)
  .option('trackingId', '')
  .option('optimize', '')
    .tag('library', '<script id="hede" src="./test.js">')


Custom.prototype.initialize = function() {
  
    console.log(this)

  this.load('library', this.ready);
};

Custom.prototype.loaded = function() {
  return !!window.gaplugins;
};

Custom.prototype.page = function() {
   console.log('page')
    this.pageCalled = true;
};


