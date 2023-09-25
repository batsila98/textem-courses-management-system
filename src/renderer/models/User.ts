type User = {
  _id: string;
  email: string;
  full_name: string;
  gender: string;
  username: string;
  password: string;
  date_creation: Date | number;
  date_modification: Date | number;
};

export default User;
