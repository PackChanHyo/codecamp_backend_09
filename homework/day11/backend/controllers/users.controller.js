import { UsersMb } from "../models/userSchema.js";
export class UsersController {
  GetUser = async (req, res) => {
    const result = await UsersMb.find();

    res.send(result);
  };
}
