const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')
const Comment = require('../model/Cmt')

router.get('/', homeController.homePage)
router.get('/list', homeController.sendListSongs)
router.get('/stream', homeController.handle);
router.get('/download', homeController.download);
router.post('/comment',homeController.pushedComment)
router.get('/comment', homeController.getAllcommentByMusic)
router.post('/music',homeController.pushMusic)
// router.get('/test', homeController.pushMusic);

module.exports = router;