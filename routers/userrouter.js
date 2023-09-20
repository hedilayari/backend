const passport = require("passport")
const usercontroller=require("../controllers/usercontroller")
const router=require("express").Router()

router.get("/",usercontroller.findalluser)
router.post("/add",usercontroller.adduser)
router.post("/register",usercontroller.Register)
router.post("/login",usercontroller.Login)

//router.get("/profile",passport.authenticate('jwt',{session:false}),usercontroller.Profile)
router.get("/:id",usercontroller.finduserbyId)
router.delete("/:id",usercontroller.supprimer)
router.put("/:id",usercontroller.modifier)
module.exports=router