const { News } = require('../models');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/news/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({ storage });

module.exports = {

  async index(req, res ){
    const news =  await News.findAll();

    return res.json(news);
  },

  async view(req, res ){
    const news =  await News.findOne({ where: { id: req.params.id } });

    if (!news) {
      return res.status(401).json({ message: 'New not found' });
    }

    return res.json(news);
  },

  async store(req, res) {
    upload.single('image')(req, res, async () => {
      const { title, content } = req.body;

      try {
        const news = await News.create({ title, content });
        if (req.file) {
          news.image = req.file.filename;
          await news.save({ fields: ['title', 'content', 'image'] });
        }
        return res.json(news);
      } catch (err) {
          return res.status(401).json({ err, title })
      }
    });
  },

  async update(req, res) {
    upload.single('image')(req, res, async () => { 
      const { title, content } = req.body;

      try {
        const news = await News.findOne({ where: { id: req.params.id } });
        news.title = title;
        news.content = content;
        if (req.file) {
          news.image = req.file.filename;
          await news.save({ fields: ['title', 'content', 'image'] });
        } else {
          await news.save({ fields: ['title', 'content'] });
        }
        
        return res.json(news);
      } catch (err) {
          return res.status(200).json({ err, title })
      }
    });
  },

  async destroy(req, res) {
    try {
      const news = await News.findOne({ where: { id: req.params.id } });
      await news.destroy();
      return res.json(news);
    } catch (err) {
      return res.status(401).json({ err })
    }
  }
};