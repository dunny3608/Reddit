const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const app = express();

app.get("/comments", (req, res) => {
  const postId = req.query.postId;
  console.log(postId);

  const filePath = path.join(__dirname, "PEDs_comments (txt)");
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  const postComments = [];
  console.log(
    new Date().getHours(),
    ":",
    new Date().getMinutes(),
    ":",
    new Date().getSeconds()
  );
  rl.on("line", (line) => {
    try {
      //   console.log(line, "line---");
      const comment = JSON.parse(line);
      if (comment.link_id === `t3_${postId}`) {
        postComments.push(comment);
        console.log(comment);
      }
    } catch (error) {
      console.error("Error parsing line:", error);
    }
  });

  rl.on("close", () => {
    console.log(
      new Date().getHours(),
      ":",
      new Date().getMinutes(),
      ":",
      new Date().getSeconds()
    );
    res.json(postComments);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
