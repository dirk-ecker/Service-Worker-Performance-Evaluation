import express from 'express'
import fs from 'fs'
import staticModule from 'static-module'
import path from 'path'

const __dirname = path.resolve()
const router = express.Router()

const PAGES = [
  { path: '/', page: 'pages/home.html' },
  { path: '/content1', page: 'pages/content1.html' },
]

PAGES.forEach(({ path, page }) => {
  router.get(path, (req,res, next) => {
    res.render(page)
  });
 
});

router.use('/views', express.static(__dirname + '/views/', { maxAge: '1y' })) // define path for partial caching


//Default caching headers
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

export default router
