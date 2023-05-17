const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb")
const port = 5000
const app = express()
app.use(cors())
app.use(express.json())
//tanzimnahid6
//N1y1Tfa4ibZMWgTf

const uri =
  "mongodb+srv://tanzimnahid6:N1y1Tfa4ibZMWgTf@cluster0.67pxtuv.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    const serviceCollection = client.db("agency2DB").collection("services2")
    const bookingCollection = client.db("agency2DB").collection("Booking")

    //get all data from database=============
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({})
      const result = await cursor.toArray()
      res.send(result)
    })

    //get a single id ========================
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await serviceCollection.findOne(query)
      res.send(result)
    })
    //POST all booking selected info...
    app.post("/bookings", async (req, res) => {
      const bookingInfo = req.body
      console.log(bookingInfo)
      const result = await bookingCollection.insertOne(bookingInfo)
      res.send(result)
    })
    //get all booking data throw email
    app.get("/bookings/:email", async (req, res) => {
      const email = req.params.email
      const query = {email:email}
      const bookings = await bookingCollection.find(query).toArray()
      res.send(bookings)
    })
    //delete bookings data by user==
    app.delete('/bookings/:id',async (req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log("Agency running on port 5000")
})
