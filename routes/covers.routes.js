const {Router} = require('express');
const Cover = require('../models/Cover');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require("multer");
const path = require("path");


const maxSize = 1000 * 1000;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, cb) {
        const datetime = Date.now();
        cb(null, file.fieldname + '-' + datetime + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function (req, file, cb) {
        const mime = file.mimetype;
        if (mime !== 'image/pjpeg' && mime !== 'image/jpeg' && mime !== 'image/png') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }

}).single('filedata');


router.post('/create',
    auth,
    function (req, res, next) {
    upload(req, res, function (err) {
            if (req.fileValidationError) {
                return res.status(400).json({message: 'wrong mimetype'});
            }
            else next()
        }
    )
},
    async (req, res, next) => {
        try {
            const filedataName = `/uploads/${req.file.filename}`;
            const {author, label, date, genre} = req.body;
            const cover = new Cover({
                author, label, date, genre, filedataName
            });

            await cover.save();

            res.status(201).json({cover})

        } catch (e) {
            res.status(523).json({message: 'something went wrong'});
        }
    });

router.get('/', async (req, res) => {
    const skip = req.headers.skip;
    let perPage = 6,
        page = skip > 0 ? skip : 0;
    try {

        const covers = await Cover.find().limit(perPage).skip(perPage * page);

        return res.json(covers)

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const covers = await Cover.findById(req.params.id);
        res.json(covers)

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
});

module.exports = router;