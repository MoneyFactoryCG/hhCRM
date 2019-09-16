import { Strategy, ExtractJwt } from 'passport-jwt';

import models from '../models';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default passport => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await models.User.findById(
          payload.userId,
        ).select('login id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    }),
  );
};
