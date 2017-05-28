'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './postsapp.events';

var PostsappSchema = new mongoose.Schema({
	postid:String,
  	postname: String,
 	userid:String,
  	username:String,
  	status:{type:String,default:'waiting for approval'}
});

registerEvents(PostsappSchema);
export default mongoose.model('Postsapp', PostsappSchema);
