/*
import { init } from 'analyticsjs';
import { config } from './analytics-config'

init(config);
*/

var analytics = require('analyticsjs');
var analyticsConfig = require('./analytics-config');

analytics.init(analyticsConfig.config);
