
// ADD THIS TO ANY ROUTE REQUIRING USER AUTHENTICATION
// this will simply prompt user to login
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', 'Please log in to view this page.');
            res.redirect('/users/login');
        }
    }
}