const uuid = require('uuid');

const HttpError = require("../models/http-error");

//inMemory Dataset
DUMMY_USERS=[
    {
        id: "u1",
        firstName: "Andrew",
        lastName: "Fickleberry",
        age: 27,
        email: "fa@xyz.com",
        password: "test"
    },
    {
        id: "u2",
        firstName: "Samuel",
        lastName: "Stocking",
        age: 30,
        email: "ss@xyz.com",
        password: "testing"
    }
];

const getAllUsers = (req,res,next)=>{
    console.log("Get list of all Users");
    if(!DUMMY_USERS){
        throw new HttpError("User List is Empty", 404);
    }
    res.json(DUMMY_USERS);
}

const getUserById = (req,res,next)=>{
    let userId = req.params.uid;
    console.log("Get info of userId: "+userId)
    let user = DUMMY_USERS.find((u)=>{
        return u.id==userId;
    });
    //another way of handling error
    //if(!user){
    //    const error = new Error("user not present");
    //    error.code = 404;
    //    return next(error);
    //}
    if(!user){
        throw new HttpError("User not present",404);
    }

    res.json(user);
}

const createUser = (req,res,next)=>{
    const {firstName,lastName,age,email,password} = req.body;
    if(DUMMY_USERS.find((p)=>{p.email==email}))
        throw new HttpError("a user already register with this email", 422);
    let newUser = {id:uuid.v4(), firstName, lastName, age, email, password};
    if(!newUser)
        throw HttpError("Error on creating user",422);
    DUMMY_USERS.push(newUser);
    console.log("new User signed up!!");
    res.status(201).json(newUser);
}

const loginUser = (req,res,next)=>{
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(p=>{return p.email==email});
    if(!identifiedUser || identifiedUser.password!==password)
        throw new HttpError("Credentials are not matching",401);
    res.json({message: "Logged in!"});
}


exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;