# Type and Learn Client

This project is an Ember CLI application, which is the frontend of my home project called Type and Learn.

The backend is a rails API: https://github.com/tothpeter/type_and_learn_api

There is a third app, that is in charge to bootstrap the whole project in production: https://github.com/tothpeter/type_and_learn_web

The final app is live here: http://type-and-learn.kalina.tech

A broader description is on its way...

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

#### To upload assets
* `ember deploy --environment production`

#### To activate a certain release
* `ember deploy:list`
* `ember deploy:activate --revision type-and-learn-client:<release> --environment production`

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

