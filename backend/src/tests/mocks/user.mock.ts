const currentUser = [
  {
    email: "test@gmail.com",
    username: "testUser",
  },
];

const loginData = {
  email: "found@gmail.com",
  password: "pass",
};

const foundUser = [
  {
    user_id: 2,
    email: "found@gmail.com",
    username: "found",
    password_hash: "hashedPassword",
  },
];

const registerData = {
  email: "newUser@gmail.com",
  username: "new",
  password: "123",
};

const registeredUser = [
  {
    user_id: 3,
    email: "newUser@gmail.com",
    username: "new",
  },
];

const usernameData = {
  newUsername: "change",
};

const passwordData = {
  currentPassword: "test1",
  newPassword: "test2",
};

const passwordHash = [
  {
    password_hash: "test1",
  },
];

export default {
  currentUser,
  loginData,
  foundUser,
  registerData,
  registeredUser,
  usernameData,
  passwordData,
  passwordHash,
};
