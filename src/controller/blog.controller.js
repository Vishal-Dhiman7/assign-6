const Blog = require("../models/Blog");


exports.create = (req, res) => {
    const blog = new Blog({
        topic: req.body.topic,
        description: req.body.description,
        posted_at: req.body.posted_at,
        posted_by: req.body.posted_by
    });

    //insert in mongoDb
    const addData = async () => {
        try {
            const data = await blog.save();
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    addData();
}



exports.findAll = (req,res)=>{
    const page = req.query.page;
    const limit = req.query.limit;
    // let arr = [];

    Blog.find()
    .then(data => {
        console.log(data);
      let arr = data;
      let lower_index = (page-1)*limit;
      let upper_index = page*limit;
      data = arr.slice(lower_index,upper_index);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });


}


exports.update=(req,res)=> {
    if(!req.body){
        res.status(400).send({message: "Data body cannot be emoty"})
        return;
    }

    const id=req.params.id;
    Blog.findByIdAndUpdate(id, req.body, {useFindAndMondify: false}).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });

        } else{
            console.log(data);
            res.send({ message: "Tutorial was updated successfully." });
        } 
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
}


exports.delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndRemove(id,{useFindAndMondify:false})
    .then(data => {
        if(!data){
            console.log(data);
            res.status(404).send("error")
        }
        else{
            res.send("delete successfully")
        }
    })
    .catch((err)=>{
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
    })
}

// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Blog.findByIdAndRemove(id, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         } else {
//           console.log(data);
//           res.send({
//             message: "Tutorial was deleted successfully!"
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id=" + id
//         });
//       });
//   };
