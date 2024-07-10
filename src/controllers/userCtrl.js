import Users from "../models/userModel";

const userCtrl = {
  getAllUser: async (req, res) => {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
      const page = req.query.page ? parseInt(req.query.page) : 0;
   

      const { search, sort, role } = req.query;

      var query = {};
      var keywordCondition = search
        ? {
            $or: [
              { lastName: { $regex: search, $options: "i" } },
              { firstName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { phoneNumber: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      if (role) {
        query.role = role;
      }

      const users = await Users.find({ $and: [query, keywordCondition] })
        .limit(pageSize)
        .skip(pageSize * page)
        .sort(`${sort}`);
   

      var length = await Users.find({
        $and: [query, keywordCondition],
      }).count();
      res.status(200).json({
        status: "success",
        length,
        users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        lastName,
        firstName,
        email,
        password,
        phoneNumber,
        avatar,
        role,
      } = req.body;
  
      const user = await Users.findOne({ email });
      if (user)
        return res.status(401).json({ msg: "The email already exists" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Password is least 6 char" });
   
      const newUser = new Users({
        lastName,
        firstName,
        email,
        phoneNumber,
        avatar,
        role,
        password,
      });
      await newUser.save();
      res.status(200).json({ msg: "Create user success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Users.findOneAndDelete({ _id: req.params.id });

      res.status(200).json({
        msg: "Deleted success!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        lastName,
        firstName,
        email,
        password,
        phoneNumber,
        avatar,
        role,
        _id,
      } = req.body;

      await Users.findOneAndUpdate(
        { _id: _id },
        {
          lastName,
          firstName,
          email,
          password,
          phoneNumber,
          avatar,
          role,
        },
        { new: true }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
