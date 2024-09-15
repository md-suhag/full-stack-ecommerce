const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const menuCollections = client
      .db("fullStackFoodEcommerce")
      .collection("menus");
    const cartCollections = client
      .db("fullStackFoodEcommerce")
      .collection("cartItems");

    // all menu items operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    // all cart operations

    // posting cart data in db
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    //get carts using email

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    });

    // get specific cart
    app.get("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.findOne(filter);
      res.send(result);
    });

    // delete items from cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(filter);
      console.log(result);
      res.send(result);
    });

    // Update cart's quantity
    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      let { quantity } = req.body;

      try {
        quantity = parseInt(quantity, 10);
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            quantity: quantity,
          },
        };

        const result = await cartCollections.updateOne(
          filter,
          updateDoc,
          options
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Cart item not found" });
        }

        res.status(200).send({
          message: "Cart item quantity updated successfully",
          result,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating cart item", error });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
