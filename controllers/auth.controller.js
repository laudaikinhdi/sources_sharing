const User = require('mongoose').model('User');
const passport = require('passport');

const indexLogin = (req, res, next) => {
    res.render('auth/login');
};

const login = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.render('auth/login', { error: { message: info['login-message'] }});

        req.logIn(user, err => {
            if (err) return next(err);
            res.redirect('/');
        });
    })(req, res, next);
};

const logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) return next(err);
        req.logout();
        res.redirect('/');
    });
};

const register = (req, res) => {
    res.render('user/createAccount');
};

const postRegister = async (req, res, next) => {
    const { username, password }  = req.body;

    const user = new User();
    user.username = username;
    user.setPassword(password);

    user.save((err, user) => {
        if (err) return next(err);
        console.log('Saved :', user);
        res.redirect('/');
    });
}

module.exports = {
    indexLogin,
    login,
    logout,
    register,
    postRegister
}