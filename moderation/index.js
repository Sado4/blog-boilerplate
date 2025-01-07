const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const isRejected = data.content.includes("orange");
    const status = isRejected ? "rejected" : "approved";

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Server is running on port 4003");
});
