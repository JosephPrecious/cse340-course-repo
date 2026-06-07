import express from 'express';

const router = express.Router();

/*
 * Home Page
 */
router.get('/', (req, res) => {

    res.render('home', {
        title: 'CSE 340 Service Network'
    });
});

export default router;