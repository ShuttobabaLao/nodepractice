  const express = require('express');
  const app     = express();
  const User = require('../models/user'); 
 
  /*This where our methods begin*/

app.get('/', (req, res) => {
     res.render('index');  // Renders template index.ejs
   });

app.get('/create', (req, res) => {
    res.render('create', {error: "", success: ""});
  }) ;

app.post('/create', (req, res) => {
     let name = req.body.name;
     let id_no = req.body.id_no;
     let email = req.body.email;
     let grade = req.body.grade;
     let tname = req.body.tname;
     let gender = req.body.gender;
     let bio   = req.body.bio;

     let user = new User();
     user.name = name;
     user.id_no = id_no;
     user.email = email;
     user.grade = grade;
     user.tname = tname;
     user.gender = gender;
     user.bio = bio;
     user.save((err, user) => {
        if(err) {
          res.render('create', {error: err, success:""});
        }else{
          res.render('create', {error: "",success: "Member Added Succesfully"});
        }
      })

    })

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err) throw err;
    res.render('users', {users: users});
 })
 })

 // Route to display edit page
 app.get('/edit:id', (req, res) => {
  let id = req.params.id;
  User.findOne(id, (err, user) => {
    if(err) throw err;
    console.log(user);
    res.render('edit', {user: user});
  })
 })

 //route for updating the member details
 app.post('/edit:id', (req, res) => {

  let id = req.body.id;
  User.findById(id, (err, user)=>{
    if(err) throw err;
    user.name = req.body.name,
    user.id_no = req.body.id_no,
    user.email = req.body.email,
    user.grade = req.body.grade,
    user.tname = req.body.tname,
    user.gender = req.body.gender,
    user.bio = req.body.bio
    user.save(function(err){
    if(err) throw err;
    res.redirect('/students');     
     })
  }) 
})

 // route for removing an individual member from database
 app.get('/delete:id', (req, res) => {

 User.remove(req.params.id, (err) => {
    
    res.redirect('/students');
 })
})

  /*This where our methods end*/
 
  module.exports = app    // Export our contoller