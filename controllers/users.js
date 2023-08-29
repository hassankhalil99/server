import User from  "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friend = await Promise.all(
      User.friend.map((id) => User.findById(id))
    );
    const formatedFriend = friend.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formatedFriend);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
    try{
        const {id,friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(friendId)
        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>id!==friendId);
            friend.friends = friend.friends.filter((id)=>id!==id)
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            User.friend.map((id) => User.findById(id))
          );
          const formatedFriend = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );

    }catch (err) {
    res.status(400).json({ msg: err.message });
  }
    
};
