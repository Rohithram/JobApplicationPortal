# jobappportal

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.0.
##About the app:
This is Job Application portal webapp which is used to apply for jobs.
To apply for any app the user need to login or register themselves otherwise they can only look at the posts that are there.
Once logged in you will be able to see apply button and you can apply for any number of posts!
Even if you apply for the same post many times it will be taken only once in the server.
You can see the list of posts applied by you in customer page.which is shown in the main tab only when you are logged in.
You can see status of your application there.
once the Hiring Managers (admins) do an action on your application ,you will be able to see your status of your application in your customer page whether selected or rejected.
The selection is done randomly by the admin.


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

