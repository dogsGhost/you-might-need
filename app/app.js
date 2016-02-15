import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

// add support for data attributes on linkTos and inputHelpers
Ember.LinkComponent.reopen({
  attributeBindings: ['data-tests']
});

Ember.TextField.reopen({
  attributeBindings: ['data-tests']
});

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
