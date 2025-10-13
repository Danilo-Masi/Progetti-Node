import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", {
        title: "Astronomy picture of the day",
        pic_url: "/saturn-voyager.jpg",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Astronomy picture of the day",
    });
});

app.listen(port, () => {
    console.log(`APOD app listening on port ${port}`);
});
