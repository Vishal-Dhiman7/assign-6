const router = require('express').Router();
const Blog = require('../controller/blog.controller')

// Your routing code goes here

router.post("/blog", Blog.create);
router.get("/blogs",Blog.findAll);
router.put("/blog/:id",Blog.update);
router.delete("/blog/:id",Blog.delete);
router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
})


module.exports = router;



