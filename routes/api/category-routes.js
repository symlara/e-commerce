const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })
  .then(dbCategoryData => {
    // see if a category matched the id
    if(!dbCategoryData) {
        // if not, send a respone
        res.status(404).json({ message: 'No category found with this id'});
        return;
    }
    // if so, send the data
    res.json(dbCategoryData);
  })
  // if there is an err catch it and send a response
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  .then(dbCategoryData => {
    // see if there is a matching id
    if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbCategoryData => {
    // see if there is a matching id
    if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;