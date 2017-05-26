/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import posts from '../api/posts/posts.model';
import admins from '../api/admin/admin.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    posts.find({}).remove()
      .then(() => {
        posts.create({
          name:'Clerk post',
          State:'open',
          limitnumber:'5'
        }, {
          name: 'Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Director post',
          State:'open',
          limitnumber:'2'
        }, {
          name: 'Senior Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Deputy Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Sales Manager',
          State:'open',
          limitnumber:'2'
        });
        return posts;
      })
    .then(() => console.log('finished populating posts'))
    .catch(err => console.log('error populating posts', err));


    admins.find({}).remove()
    .then(() => {
        admins.create({
          name:'Clerk post',
          State:'open',
          limitnumber:'5'
        }, {
          name: 'Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Director post',
          State:'open',
          limitnumber:'2'
        }, {
          name: 'Senior Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Deputy Manager post',
          State:'open',
          limitnumber:'3'
        }, {
          name: 'Sales Manager',
          State:'open',
          limitnumber:'2'
        });
        return admins;
      })
    .then(() => console.log('finished populating admins'))
    .catch(err => console.log('error populating admins', err));


    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'hm@shaastra.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
