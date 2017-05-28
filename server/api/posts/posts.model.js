'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './posts.events';

var PostsSchema = new mongoose.Schema({
  name: {type:String,required:true},
  State:{type:String , default:'open'},
  limitnumber:{type:Number , required:true}
});

registerEvents(PostsSchema);
export default mongoose.model('Posts', PostsSchema);
