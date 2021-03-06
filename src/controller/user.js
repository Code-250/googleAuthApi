/* eslint-disable camelcase */
import db  from "../database/models/index";

const { User, Profile } = db;

class userLogin {
  static async userGoogleLogin(req, res) {
    try {
      const { id, given_name, family_name, email } = req.user;
      const loggedIn = await User.findOrCreate({
        where: { googleId: id },
        defaults: {
          googleId: id,
          givenName: given_name,
          familyName: family_name,
          email,
        },
      });
      res.send({ message: "successfully authenticated", loggedIn });
    } catch (err) {
      res.send({ message: "something went wrong..", err });
      console.log(err);
    }
  }
  
  static async getAllUsers(req, res) {
    try {
      const user = await User.findAll({
        include: [
          {
            model: Profile,
            as: "profiles",
          },
        ],
      });
      return res.status(200).json({ message: "retrived users", user });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default userLogin;
