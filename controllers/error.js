module.exports = (req, res, next) => {
    res.status('404').render('default', { pageTitle: 'Page Not Found' });
}