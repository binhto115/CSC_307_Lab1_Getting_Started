// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}/users`
    );
});



const users = {
    users_list: [{
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};



// Part 4
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

// Part 6
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

// Random ID generator
const generateRandomID = () => {
    return Math.random().toString(36).substring(2, 6);
};

// POST: Add a new user with random ID
app.post("/users", (req, res) => {
    const userToAdd = req.body;

    // assign random ID to user
    userToAdd.id = generateRandomID();

    const addedUser = addUser(userToAdd);
    if (addedUser == undefined) {
        return res.status(400).send("Bad request");
    } else {
        // returns the new object, including the randomly generated ID
        res.status(201).json(addedUser);
    }

});

// DELETE:
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result == undefined) {
        res.status(404).send("Resource not found\n");
    } else {
        users["users_list"] = users["users_list"].filter(user => user.id !== id);
        res.status(204).json(result);
    }
});

// GET by ID
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found\n");
    } else {
        res.send(result);
    }
});

// Part 4
// app.get("/users", (req, res) => {
//     const name = req.query.name;
//     if (name != undefined) {
//         let result = findUserByName(name);
//         result = { users_list: result };
//         res.send(result);
//     } else {
//         res.send(users);
//     }
// });

// GET all 
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let filteredUsers = users["users_list"];

    // Check for error
    if (name !== undefined && job === undefined) {
        return res.status(400).json({
            error: "If 'name' is provided, 'job' must also be provided."
        });
    }

    // Filter by name/job
    if (name !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.name === name);
    }
    if (job !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.job === job);
    }
    if ((name !== undefined || job !== undefined) && filteredUsers.length === 0) {
        return res.status(404).json("User not found");
    }
    res.json({ users_list: filteredUsers });
});