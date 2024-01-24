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
    res.json({ status: false, error: err });
    return;
  }
  res.json({
    status: true,
  });
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
    "INSERT INTO mazes(map) VALUES ?;",
    maze.maze
  );
  if (err != null) {
    console.log(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

const mazeFuncs = require("./randomMaze");

exports.generateMaze = async (req, res) => {
  const maze = mazeFuncs.RandomMaze();
  let mazeSTR = "";
  maze.forEach((element) => {
    mazeSTR += element.toString() + "|";
  });
  mazeSTR = mazeSTR.slice(0, -1);
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO mazes(map) VALUES (?);",
    mazeSTR
  );
  if (err != null) {
    console.log("An existing maze is already in the database");
    getRandomMaze().then((result) => {
      mazeArray = result[0]["map"];
      mazeArray = mazeArray.split("|");
      mazeArray = mazeArray.map((el) => {
        lineSTR = el.split(",");
        lineSTR = lineSTR.map((element) => {
          if (element != "A" && element != "B") return parseInt(element);
          return element;
        });
        return lineSTR;
      });
      res.json({ status: true, maze: mazeArray });
    });
    return;
  }
  res.json({ status: true, maze: maze });
};

getRandomMaze = async () => {
  const maze = await Database.Read(
    DB_PATH,
    "SELECT * FROM mazes ORDER BY RANDOM() LIMIT 1;"
  );
  return maze;
};
