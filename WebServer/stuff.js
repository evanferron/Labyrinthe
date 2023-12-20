const Database = require("./Database");
const DB_PATH = "./maze.db";
const crypto = require("crypto");

const hashPassword = (algorithm, base, passwd) => {
  return crypto.createHash(algorithm).update(passwd).digest(base);
};

//ACCOUNTS

exports.addAccount = async (req, res) => {
  const account = req.body;
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO accounts(nickname,email,password) Values(?,?,?);",
    account.nickname,
    account.email,
    hashPassword("sha256", "base64", account.password)
  );
  if (err != null) {
    console.log(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

exports.verifAccount = async (req, res) => {
  const account = req.body;
  const user = await Database.Read(
    DB_PATH,
    "SELECT * FROM accounts WHERE email = ? AND password=?",
    account.email,
    hashPassword("sha256", "base64", account.password)
  );
  if (user.length == 0) {
    console.log(err);
    res.json({ exist: false });
    return;
  }
  res.json({
    exist: true,
    userId: user[0].accountId,
    nickName: user[0].nickname,
  });
};

//Maze

exports.addMaze = async (req, res) => {
  const maze = req.body;
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO mazes(map) VALUES ?;"
    ,maze.maze
  );
};
