'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './posts.events';

var PostsSchema = new mongoose.Schema({
  name: String,
  State:String,
  limitnumber:String
});

registerEvents(PostsSchema);
export default mongoose.model('Posts', PostsSchema);
