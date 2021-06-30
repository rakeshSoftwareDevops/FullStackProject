const {
    create,
    getUserByUserEmail,
    //getUserByUserId,
    getUsers,
    updateUser, // generate a salt using genSaltSync
    deleteUser,  // salt, password are parameters of hashsync method to hash
    createSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippetByUserId
} = require("./user.service");// comparesync to compare the hashed password with the original password
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports={
    createUser: (req, res) => {
        //getting the data from request body
        const body = req.body;
        console.log(body);
        //generating the salt for hashing
        const salt = genSaltSync(10);
        //using the salt tp emcrypt the password
        console.log(req);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
      },
    insertSnippet:(req,res)=>{
      const body = req.body;
      createSnippet(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });

    },
      login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfullysfsf",
              token: jsontoken,
              user_id:results.id
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
        });
      },
 /**     getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not Found"
            });
          }
          results.password = undefined;
          return res.json({
            success: 1,
            data: results
          });
        });
      },*/
      getSnippets: (req, res) => {
        const body = req.body;
        console.log(req.body);
        console.log("just here"+body);
        getSnippetByUserId(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              data:results,
              message: "Record not Found Here"
            });
          }
          //results.password = undefined;

          return res.json({
            success: 1,
            data: results
          });
        });
      },
      getUsers: (req, res) => {
        console.log("just go"+req.body);
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      },
      updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            message: "updated successfully"
          });
        });
      },
      updateSnippets: (req, res) => {
        const body = req.body;
      
        updateSnippet(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            message: "updated snippet successfully"
          });
        });
      },
      deleteSnippets: (req, res) => {
        const data = req.body;
        deleteSnippet(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!err) {
            return res.json({
              success: 1,
              message: "snippet deleted successfully"
            });
          }
          return res.json({
            success: 1,
            message: "snippet deleted successfully"
          });
        });
      },
      
      
      deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!err) {
            return res.json({
              success: 1,
              message: "user deleted successfully"
            });
          }
          return res.json({
            success: 1,
            message: "user deleted successfully"
          });
        });
      }
}
