const iotcontroller=require("../controllers/iotcontrol")

const router=require("express").Router()

router.get("/",iotcontroller.getallvalue)
router.get("/moy",iotcontroller.getMonthlyAverage)
module.exports=router