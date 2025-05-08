import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../schema/User.js';
import bcrypt from 'bcrypt';
passport.use(new LocalStrategy(
    {
        usernameField: 'email', 
        passwordField: 'password',  
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: 'No user found with that email.' });
            }
            console.log("user", password, user.password)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
