// const Todo = require('../Models/todo')


// const getTodos = (req,res)=>{
//   Todo.find({},(err,todos)=>{
//     res.json(todos)
//   });
// }


// const createTodo = (req,res)=>{
//   const todo = new Todo()
//   todo.task = req.body.task
//   todo.date = req.body.date
//   todo.user = req.body.user
//   todo.save()
//   res.send()
// }


// const getTodoById = (req,res)=>{
//   let todo = Todos.filter(item => item.id == req.params.id)
//   res.json(todo)
// }

// const getSingleTodo = (req, res) => {
//   Todo.find({
//     date: { $gt: req.query.date}}, (err,todo)=>{
//     if(err) return res.status(400).send("Not found")

//     res.json(todo)
//   })

// }

// const getTodoByPersons = (req,res) => {
//   Todo.find({
//     // task:{ $regex:req.query.taskname }}, (err,todo)=>{
//      person: { $gt: req.query.date}}, (err,todo)=>{
//      if(err) return res.status(400).send("Not found")
 
//      res.json(todo)
//    })
// }

// const editTodo = (req,res) => {
//   Todo.findOneAndUpdate({
//      _id : req.params.id
// },{$set: { task : "Updated task" }},(err,todo)=>{
//   if(err) return res.status(400).send("Not found")

//   res.json(todo)
// })
// }

// module.exports = {
//   getTodos,
//   createTodo,
//   getTodoById,
//   getSingleTodo,
//   editTodo
// }