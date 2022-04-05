const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
router.use(express.static('public'));

const recipieRoutes = require('./api/recipieRoutes');

router.use('/recipies', recipieRoutes);

router.get('/', (req, res) => {
    const url = 'https://api.sampleapis.com/recipes/recipes';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Tasty Recipies',
                name: 'Recipies',
                data
            });
        })
        .catch(error => {
            console.log('Error', error)
        });
});

router.get('*', (req, res) => {
    if(req.url == '/favico/ico') {
        res.end();
    } else {
        res.render('pages/errorPage', {
            title: 404,
            name: 404,
        })
    }
})

module.exports = router;