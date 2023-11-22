const projects =require('../Models/projectSchema')

// addproject
exports.addProjects = async (req,res)=>{
console.log("Inside add project function");
const userId = req.payload
const projectImage = req.file.filename
const {title,languages,overview,github,website} = req.body
// console.log(`${title},${languages},${overview},${github},${website},${projectImage}, ${userId}`);

try{
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json("Project already exist!!!  Upload another")
 
    }else{
        const newProject = new projects({
            title,languages,overview,github,website,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }

}catch(err){
    res.status(401).json(`Request failed, Error: ${err}`)

}

}


// getuserprojects-token required
exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
         const userProjects = await projects.find({userId})
         res.status(200).json(userProjects)
    }catch(err){
          res.status(401).json(err)
    }
}

// getallprojects - token required
exports.getallProjects = async (req,res)=>{
    const searchKey = req.query.searc
    const query = {
        languages:{$regex:searchKey , $options:"i"}
    }
    try{
        const allprojects = await projects.find()
        res.status(200).json(allprojects)
    }catch(err){
        res.status(401).json(err)
    }
}


// gethomeprojects - token required
exports.getHomeProjects = async (req,res)=>{
    try{
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    }catch(err){
        res.status(401).json(err)
    }
}