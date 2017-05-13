import test from 'ava'

import { niconico, Nicovideo } from '..'

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const VIDEO_ID = 'sm28222588'

let client

test.before(async t => {
  const session = await niconico.login(EMAIL, PASSWORD)
  client = new Nicovideo(session)
})

test('get watch data containers', async t => {
  const result = await client.watch(VIDEO_ID)
  t.is(result.watchAPI.videoDetail.title, '【ゆめにっき】クリプト・オブ･ザ・モノクロダンサー')
})

test('fail when invalid videoID given', t => {
  return client
    .watch('sm99999999999')
    .then(result => t.fail(result))
    .catch(err => {
      t.pass(err)
    })
})

test('fail when credentials missing', async t => {
  try {
    const session = await niconico.login('', '')
    const result = await new Nicovideo(session).watch(VIDEO_ID)
    t.fail(result)
  } catch (err) {
    t.pass(err)
  }
})

test('getthumbinfo', async t => {
  try {
    const thumbinfo = await new Nicovideo().thumbinfo(VIDEO_ID)
    t.is(thumbinfo.watchURL, `http://www.nicovideo.jp/watch/${VIDEO_ID}`)
  } catch (err) {
    t.fail(err)
  }
})

test('invalid getthumbinfo', async t => {
  try {
    const thumbinfo = await new Nicovideo().thumbinfo('sm99999999999')
    t.fail(thumbinfo)
  } catch (err) {
    t.pass()
  }
})

test('fail to download video', async t => {
  try {
    const filePath = await client.download('sm99999999999', '.')
    t.fail(filepath)
  } catch (err) {
    t.pass()
  }
})

test('download video', async t => {
  const filePath = await client.download(VIDEO_ID, '.')
  t.pass()
})
