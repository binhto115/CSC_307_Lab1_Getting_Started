// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

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

// Part 6
// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
// };

// app.post("/users", (req, res) => {
//     const userToAdd = req.body;
//     const addedUser = addUser(userToAdd);
//     res.send(201).jason(addedUser);
// });


// Part 4
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

// const findUserByJob = (job) => {
//     return users["users_list"].filter(
//         (user) => user["job"] === job
//     );
// };

// app.get("/users", (req, res) => {
//     res.send(users);
// });

// Part 5
// const findUserById = (id) =>
//     users["users_list"].find((user) => user["id"] === id);

// // Part 7 task 1 (modified part 5)
// app.delete("/users/:id", (req, res) => {
//     const id = req.params["id"];
//     let result = findUserById(id);
//     if (result == undefined) {
//         res.status(404).send("User not found.");
//     } else {
//         users["users_list"] = users["users_list"].filter(user => user.id !== id);
//         res.json(result);
//     }
// });


// app.get("/users/:id", (req, res) => {
//     const id = req.params["id"]; //or req.params.id
//     let result = findUserById(id);
//     if (result === undefined) {
//         res.status(404).send("Resource not found.");
//     } else {
//         res.send(result);
//     }
// });

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

// Part 7 Task 2
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name !== undefined && job === undefined) {
        return res.status(400).json({
            error: "If 'name' is provided, 'job' must also be provided."
        });
    }
    let filteredUsers = users["users_list"];

    if (name != undefined) {
        filteredUsers = filteredUsers.filter(user => user.name == name);
    }
    if (job != undefined) {
        filteredUsers = filteredUsers.filter(user => user.job == job);
    }
    res.json({ users: filteredUsers });
});