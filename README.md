# niconico

[![npm version](https://badge.fury.io/js/niconico.svg)](https://badge.fury.io/js/niconico) [![Build Status](https://travis-ci.org/uetchy/niconico.svg?branch=master)](https://travis-ci.org/uetchy/niconico) [![Coverage Status](https://coveralls.io/repos/github/uetchy/niconico/badge.svg?branch=master)](https://coveralls.io/github/uetchy/niconico?branch=master)

niconico API wrapper for Node.JS.

## Usage

```
npm install --save niconico
```

```js
const {niconico, Nicovideo} = require('niconico');

return niconico
	.login(process.env.EMAIL, process.env.PASSWORD)
	.then(session => new Nicovideo(session).download('sm28222588', './videos'))
	.then(filePath => console.log('Downloaded:', filePath))
	.catch(err => console.log('Error:', err));
```

## API

The APIs return Promises. You can chain them with `then` and `catch`.

### niconico.login(email, password)

Returns a session cookie.

#### email

Type: `string`

#### password

Type: `string`

### new Nicovideo([session])

Returns a nicovideo agent. If a session given, the agent authenticate as a signed user.

#### session

a session cookie given by `niconico.login`.

### nicovideo.download(videoID, outputDir)

Download a video to local dir.

#### videoID

Type: `string`

#### outputDir

Type: `string`

### nicovideo.watch(videoID)

Fetch a /watch/ page and returns its metadata.

#### videoID

Type: `string`

### nicovideo.thumbinfo(videoID)

Returns thumbinfo. This doesn't requires `session`.

#### videoID

Type: `string`

### nicovideo.httpExport(url, outputPath)

Download the video from `url` to `outputPath`.

#### url

Type: `string`

#### outputPath

Type: `string`

## Contributing

Before create a pull-request, you need to test using `npm test`.

```
npm test
```
