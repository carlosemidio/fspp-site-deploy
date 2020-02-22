require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/editor/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({ storage });

module.exports = {
  async store(req, res) {
    upload.single('image')(req, res, async () => { 
      const image = req.file.filename;

      if(!image) {
        return res.status(401).json({ err, title })
      }

      return res.json(image);
    });
  }
};