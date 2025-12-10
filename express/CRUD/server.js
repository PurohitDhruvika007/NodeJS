import express from "express";

const data = express();
data.use(express.json());

let users = [
    {
        id: 1,
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@x.dummyjson.com"
    },
    {
        id: 2,
        firstName: "palak",
        lastName: "patel",
        email: "palak.patel@x.dummyjson.com"
    }, {
        id: 3,
        firstName: "riva",
        lastName: "sharma",
        email: "riva.sharma@x.dummyjson.com"
    }
]

// get json data from server
data.get("/", (req, res) => {
    res.json(users)
});

//post json data on server
data.post("/", (req, res) => {
    users.push(req.body);
    res.json({ message: "data is inserted", users });
})

data.put("/", (req, res) => {
    const body = req.body;
    users = users.map((user) => {
        if (user.id == body.id) {
            return body;
        }
        else {
            return user;
        }
    })
    res.json({ msg: "data updated successfully", users });
})


data.delete("/", (req, res) => {
    users = users.filter(user => user.id != req.query.id)
    res.json({ msg: "data deleted successfully", users });
})

data.listen(4000, () => {
    console.log("server started successfully at http://localhost:4000")
})