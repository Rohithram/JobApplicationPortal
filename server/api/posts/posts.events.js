/**
 * Posts model events
 */

'use strict';

import {EventEmitter} from 'events';
var PostsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PostsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Posts) {
  for(var e in events) {
    let event = events[e];
    Posts.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PostsEvents.emit(event + ':' + doc._id, doc);
    PostsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PostsEvents;
