var express = require('express')
const mongoose = require('mongoose')
const todos = require('./models/todoSchema')
var app = express()
app.set('view engine','ejs')
//setting view engine
app.use(express.static(__dirname + '/public'));//for using static files in public folder
app.use(express.urlencoded({ extended: true }));
const port = 3000
const hostname = 'localhost'
mongoose.set("useFindAndModify", false);


const url = 'mongodb://localhost:27017/todo'
mongoose.connect(url,{ useNewUrlParser: true } , ()=>{
    app.listen(port,hostname,() =>{
        console.log("server connected successfully...");
        console.log(`listeninng to ${port}`);
        
    })
})

app.route("/edit/:id")
.get((req,res)=>{
    const id =req.params.id
    todos.find({},(err,task,completion_date) => {
        res.render("todoEdit.ejs",{todos : task,idTask : id})
    })
})
.post((req,res) => {
    const id =req.params.id
    todos.findByIdAndUpdate(id,{
        task : req.body.edit_task
    }, err =>{
        if(err)
        return res.send(500,err)
        res.redirect('/')
    })
})
app.route('/remove/:id')
.get((req,res) => {
    const id = req.params.id
    todos.findByIdAndRemove(id, err =>{
        if(err)
        res.send(500,err)
        res.redirect('/')
    })
})
app.route('/done/:id')
.get((req,res) => {
    const id= req.params.id
    todos.findByIdAndUpdate({_id : id},{
        task_status : false
    } ,err =>{
        if(err) res.send(500,err)
        res.redirect('/')
    })
})
app.route('/undone/:id')
.get((req,res) => {
    const id = req.params.id
    todos.findByIdAndUpdate({_id: id},{
        task_status : true
    }, err =>{
        if(err) res.send(500,err)
        res.redirect('/')
    })
})


app.get('/',function(req,res){
    // res.send('connected')
   
    todos.find({},(err, task) => {
        console.log(task);
        res.render("index.ejs",{todos : task})
    })
})
app.post('/',async(req,res) =>{
    console.log("server connected successfully...");
    const TodoTask = new todos({
        task : req.body.newtask,
        completion_date : req.body.enter_date,
        task_status : false
        // TodoTask.save()
 })
 try{
     await TodoTask.save()
     res.redirect('/')
 }
 catch(err){
     console.log(err)
     res.redirect('/')
     
 }
   
})



