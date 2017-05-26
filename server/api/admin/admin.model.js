'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './admin.events';

var AdminSchema = new mongoose.Schema({
  name: String,
  State:String,
  limitnumber:String
});

registerEvents(AdminSchema);
export default mongoose.model('Admin', AdminSchema);
