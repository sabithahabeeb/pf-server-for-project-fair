const projects =require('../Models/projectSchema')

// addproject
exports.addProjects = (req,res)=>{
console.log("Inside add project function");
const userId = req.payload
console.log(`${userId}`);
res.status(200).json("addProjects request recieved")

}