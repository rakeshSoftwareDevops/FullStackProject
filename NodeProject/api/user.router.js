const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {
  createUser,
  login,
  //getUserByUserId,
  //getUsers,
  updateUsers,
  deleteUser,
  insertSnippet,
  updateSnippets,
  deleteSnippets,
  getSnippets

} = require("./user.controller");
//router.get("/", checkToken, getUsers);
router.post("/", createUser);
//router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/update", checkToken, updateUsers);
router.delete("/delete", checkToken, deleteUser);
router.post("/insert-snippets",checkToken,insertSnippet);
router.post("/update-snippets",checkToken,updateSnippets);
router.post("/delete-snippets",checkToken,deleteSnippets);
router.post("/get-snippets",getSnippets);

module.exports = router;
