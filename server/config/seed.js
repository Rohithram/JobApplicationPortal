/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import posts from '../api/posts/posts.model';
import postsapps from '../api/postsapp/postsapp.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    posts.find({}).remove()
      .then(() => {
        posts.create({
          name:'Clerk post',
          State:'open',
          limitnumber:5
        }, {
          name: 'Manager post',
          State:'closed',
          limitnumber:0
        }, {
          name: 'Director post',
          State:'closed',
          limitnumber:0
        }, {
          name: 'Senior Manager post',
          State:'open',
          limitnumber:3
        }, {
          name: 'Deputy Manager post',
          State:'open',
          limitnumber:3
        }, {
          name: 'Sales Manager',
          State:'open',
          limitnumber:2
        });
        return posts;
      })
    .then(() => console.log('finished populating posts'))
    .catch(err => console.log('error populating posts', err));


   postsapps.find({}).remove()
        .then(()=>{
          return postsapps;
        })
        .then(() => console.log('finished populating postsapps'))
        .catch(err => console.log('error populating postsapps', err));


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
