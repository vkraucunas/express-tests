var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("../knexfile")[environment]; // require environment's settings from knexfile
const knex = require("knex")(configuration);

/* GET home page. */
router.get("/boo", function(req, res, next) {
  res.send({ title: "Expresss" });
});

router.get("/students", async (req, res, next) => {
  const students = await knex.select("name").from("students");

  res.send({ students });
});

router.post("/students", async (req, res, next) => {
  console.log("hellllloooooo", req.body);

  const id = await knex("students").insert(req.body, ["id"]);
  res.send({ status: 200, id });
});

router.delete("/students/:id", async (req, res, next) => {
  const id = req.params.id;
  const wat = await knex("students")
    .where("id", id)
    .delete();
  res.send({ status: 204 });
});

router.put("/students", async (req, res, next) => {
  const name = req.body.name;
  try {
    const wat = await knex("students")
      .where({ id: 1 })
      .update(
        {
          name
        },
        ["name"]
      );
    res.json({ name: wat });
  } catch (err) {
    console.log(err);
    res.json({ status: 500 });
  }
});

module.exports = router;
