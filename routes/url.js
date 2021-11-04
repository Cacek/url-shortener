const express = require('express')
const validUrl = require('valid-url')
const shortHash = require('shorthash2')
const router = express.Router()

router.use(express.json())

// import database model
const UrlModel = require('../models/Url')

//simple exeptions handler
const MyException = (message, code) => {
  return {
    message, code
  }
}

const createShortUrl = (req, res) => {

  return new Promise((resolve, reject) => {
    const { longUrl } = req.body
    const hash = shortHash(longUrl)

    if (!validUrl.isWebUri(longUrl)) {
      reject(MyException(`Invalid URL: ${longUrl}`, '404'))
      return
    }

    UrlModel.findOne({ longUrl })
      .then(urlExists => {
        if (urlExists) {
          resolve(urlExists)
          return
        }

        UrlModel.create({ longUrl, hash }).then(url => {
          if (!url) {
            reject(MyException('Failed to create short url', 'B555'))
          }
          resolve(url)
        }).catch(e => {
          reject(MyException(e.message, e.code ? e.code : 'B666'))
        })
      }).catch(e => {
        reject(MyException(e.message, 'B405'))
      })
  }).then(data => {
    res.status(201).json({ data })
  }).catch(({ message, code }) => {
    res.status(400).json({ data: { message, code } })
  })
}

const getAllUrls = async (req, res) => {
  try {
    const shortUrls = await UrlModel.find({}).select("-updatedAt").sort({ createdAt: -1 })
    res.send(shortUrls)
  } catch (e) {
    res.status(500).json('Server Error')
  }
}

const getShortUrl = async (req, res) => {
  try {
    const { hash } = req.params
    console.log()
    const shortUrl = await UrlModel.findOne({ hash })
    if (!shortUrl) {
      return res.status(404).send("Short URL Not Found")
    }
    res.status(200).json(shortUrl)
  } catch (e) {
    res.status(500).json(e.message)
  }
}

//Define routes
router.post('/create', createShortUrl)
router.get('/:hash', getShortUrl)

module.exports = router
