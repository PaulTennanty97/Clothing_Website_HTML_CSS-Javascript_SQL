const express = require("express");
const app = express();
const path = require("path");
//const open =require('open');
const bodyParser = require("body-parser");
const connection = require("./public/js/db.js");
const { authenticateUser } = require("./public/js/auth.js");
const bcrypt = require("bcryptjs");
const auth = require("./public/js/alt.js");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  console.log("GET /login route accessed");
  res.render("login");
});
//Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`Extracted email: '${email}', password: '${password}'`);

  authenticateUser(email, password, (authenticated) => {
    if (authenticated) {
      // if true then do below
      console.log("Authenticaion was successful!");
      res.json({ authenticated: true, redirect: "/homepage" });
    } else {
      console.log("Authentication was not successful.");
      res.status(401).json({
        authenticated: false,
        message: "Invalid username or password. Please try again.",
      });
    }
  });
});
//Home
app.get("/homepage", (req, res) => {
  res.render("homepage");
});
//Footwear page
app.get("/footwear", function (req, res) {
  console.log("Footwear ejs accessed");
  connection.query(
    "SELECT * FROM productdata WHERE Category = ?",
    ["Footwear"],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving footwear data from database", err);
        res
          .status(500)
          .send("Error retrieving footwear data from the database");
      } else if (rows.length === 0) {
        res.render("footwear", { products: [] });
      } else {
        console.log("Footwear data retrieved!");
        res.render("footwear", { products: rows });
      }
    }
  );
});
//Trousers
app.get("/trousers", function (req, res) {
  console.log("Trousers ejs accessed");
  connection.query(
    "SELECT * FROM productdata WHERE Category = ?",
    ["Trousers"],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving footwear data from database", err);
        res
          .status(500)
          .send("Error retrieving footwear data from the database");
      } else if (rows.length === 0) {
        res.render("Trousers", { products: [] });
      } else {
        console.log("Trousers data retrieved!");
        res.render("trousers", { products: rows });
      }
    }
  );
});
//Jumpers
app.get("/jumpers", (req, res) => {
  console.log("jumpers ejs accessed");
  connection.query(
    "SELECT * FROM productdata WHERE Category = ?",
    ["jumpers"],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving jumpers data from database", err);
        res.status(500).send("Error retrieving jumpers data from the database");
      } else if (rows.length === 0) {
        res.render("jumpers", { products: [] });
      } else {
        console.log("Jumpers data retrieved!");
        res.render("jumpers", { products: rows });
      }
    }
  );
});
// T Shirts
app.get("/tShirts", (req, res) => {
  console.log("tShirts ejs accessed");
  connection.query(
    "SELECT * FROM productdata WHERE Category = ?",
    ["tShirts"],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving T Shirts data from database", err);
        res
          .status(500)
          .send("Error retrieving T Shirts data from the database");
      } else if (rows.length === 0) {
        res.render("tShirts", { products: [] });
      } else {
        console.log("T shirts data retrieved!");
        res.render("tShirts", { products: rows });
      }
    }
  );
});
//Jerseys
app.get("/jerseys", (req, res) => {
  console.log("jerseys ejs accessed");
  connection.query(
    "SELECT * FROM productdata WHERE Category = ?",
    ["jerseys"],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving jerseys data from database", err);
        res.status(500).send("Error retrieving jerseys data from the database");
      } else if (rows.length === 0) {
        res.render("jerseys", { products: [] });
      } else {
        console.log("Jerseys data retrieved!");
        res.render("jerseys", { products: rows });
      }
    }
  );
});
//checkout
app.get("/checkout", (req, res) => {
  console.log("Checkout page loading");
  res.render("checkout");
});
//start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  //open(`http://localhost:${PORT}/login`); open wouldn't work so
});

//ID1
app.get("/ID1", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID ${ID}");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD1", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID2
app.get("/ID2", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error(`No rows found for ID ${ID}`);
      } else {
        console.log(`Data retrieved from the database for ID: ${ID}`);
        console.log(rows[0].ID);
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD2", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID3
app.get("/ID3", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID ${ID}");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD3", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID4
app.get("/ID4", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID ${ID}");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD4", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID5
app.get("/ID5", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID $[ID]");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD5", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID6
app.get("/ID6", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID $[ID]");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD6", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID7
app.get("/ID7", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID $[ID]");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD7", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID8
app.get("/ID8", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error("No rows found for ID $[ID]");
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD8", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID9
app.get("/ID9", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error(`No rows found for ID ${ID}`);
      } else {
        console.log("Data retrieved from the database");
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD9", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
//ID10
app.get("/ID10", function (req, res) {
  console.log("This is from a get request");
  const ID = req.query.rec;
  connection.query(
    "SELECT * FROM productdata WHERE ID = ?",
    [ID],
    function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database", err);
        res.status(500).send("Error retrieveing data from the database");
      } else if (rows.length === 0) {
        console.error(`No rows found for ID ${ID}`);
      } else {
        console.log(`Data retrieved from the database for ID: ${ID}`);
        console.log(rows[0].ID);
        console.log(rows[0].Name);
        console.log(rows[0].Price);
        console.log(rows[0].Category);
        const prod = rows[0];
        res.render("iD10", {
          ID: prod.ID,
          Name: prod.Name,
          Price: prod.Price,
          Category: prod.Category,
          Image: prod.image_url,
        });
      }
    }
  );
});
