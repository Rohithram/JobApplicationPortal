'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './postsapp.events';

var PostsappSchema = new mongoose.Schema({
  postname: String,
  userid:String,
  username:String,
  status:String 
});

registerEvents(PostsappSchema);
export default mongoose.model('Postsapp', PostsappSchema);
