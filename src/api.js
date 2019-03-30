// configs
const key = "haka_ton2"; // secret key

// reqs
const express = require("express");
const app = express();
app.use(express.static('build'))
app.use(express.json());
const fs = require("fs");
const _ = require("underscore");

// cors
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 500000000000000000000000000
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// datas
const customers = JSON.parse(
    fs.readFileSync("../rData/customers/customers.json")
);
const employees = JSON.parse(
    fs.readFileSync("../rData/employees/employees.json")
);
const products = JSON.parse(fs.readFileSync("../rData/products/products.json"));
const stores = JSON.parse(fs.readFileSync("../rData/stores/stores.json"));

// product-types
/** Use word list as a filter. Word lists can be modified later on, to add more products to each categories.
 * Note that filtering buckets works bit different. */
var foodWords = ["Pizza", "Chocolate Bar", "Gum", "Bread"];
const foods = products.filter(
    product => foodWords.includes(product.productType)
);
var drinkWords = ["Premium Cider", "Alcohol Free Wine", "Special Water", "Cider", "Lemonade", "Cola", "Beer"];
const drinks = products.filter(
    product => drinkWords.includes(product.productType)
);
var containerWords = ["Bucket", "Basket"];
const containers = products.filter(
    product => containerWords.includes(product.productType)
);
const buckets = products.filter(product => product.productType === "Bucket");
var miscWords = ["Notebook", "Helmet", "Keychain", "Tin Foil", "Pencil", "Helmet"];
const misc = products.filter(
    product => miscWords.includes(product.productType)
);

// handlers
app.get("/api/customers", (req, res) => {
    console.log(":D");
    res.send(customers);
});
app.get("/api/employees", (req, res) => {
    console.log(":D");
    res.send(employees);
});
app.get("/api/products", (req, res) => {
    console.log(":D");
    res.send(products);
});
app.get("/api/stores", (req, res) => {
    console.log(":D");
    res.send(stores);
});

// product-types
app.get("/api/products/foods", (req, res) => {
    console.log(":D");
    res.send(foods);
});
app.get("/api/products/drinks", (req, res) => {
    console.log(":D");
    res.send(drinks);
});
app.get("/api/products/containers", (req, res) => {
    console.log(":D");
    res.send(containers);
});
app.get("/api/products/containers/buckets", (req, res) => {
    console.log(":D");
    res.send(buckets);
});
app.get("/api/products/misc", (req, res) => {
    console.log(":D");
    res.send(misc);
});

// open to localhost:6900
const PORT = process.env.PORT || 6900
app.listen(PORT, () => console.log("Ready to gamibinify in port 6900.."));
