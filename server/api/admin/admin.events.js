/**
 * Admin model events
 */

'use strict';

import {EventEmitter} from 'events';
var AdminEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdminEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Admin) {
  for(var e in events) {
    let event = events[e];
    Admin.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    AdminEvents.emit(event + ':' + doc._id, doc);
    AdminEvents.emit(event, doc);
  };
}

export {registerEvents};
export default AdminEvents;
