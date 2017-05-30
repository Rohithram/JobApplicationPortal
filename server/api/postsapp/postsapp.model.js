'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './postsapp.events';

var PostsappSchema = new mongoose.Schema({
	postid:String,
  	postname: String,
 	userid:String,
  	username:String,
  	status:{type:String,default:'waiting for approval'},
  	approve:{type:Boolean,default:false},
  	applied:{type:Boolean,default:false}
});

registerEvents(PostsappSchema);
export default mongoose.model('Postsapp', PostsappSchema);
