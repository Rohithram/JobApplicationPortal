'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './posts.events';

var PostsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PostsSchema);
export default mongoose.model('Posts', PostsSchema);
