import express from 'express'
import fs from 'fs'
import staticModule from 'static-module'
import path from 'path'

const __dirname = path.resolve()
const router = express.Router()

const PAGES = [
  { path: '/', page: 'pages/home.html' },
  { path: '/content1', page: 'pages/content1.html' },
  { path: '/content2', page: 'pages/content2.html' },
  { path: '/content1/streaming', page: 'pages/content1.streaming.html'}
]

PAGES.forEach(({ path, page }) => {
  
  router.get(path, (req,res, next) => {
    res.render(page)
  });
 
})

router.use('/views', express.static(__dirname + '/views/', { maxAge: '1y' })) // define path for partial caching

router.get('/sw.mjs', (req,res) => {
  res.set('Content-Type', 'application/javascript') //MIME type
  // const input = fs.createReadStream(`${__dirname}/sw.js`)
  const input = fs.createReadStream('sw.mjs')
  const toCache = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    './views/partials/footer.html',
    './views/partials/header.html',
  ]

 input.pipe(staticModule({   //static module is available inside js
      'static-to-cache':() => JSON.stringify(toCache, null, '  ')
 }))
 .pipe(res)
})

//Default caching headers
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

export default router
