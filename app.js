const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser= require("body-parser");
mongoose.connect('mongodb://localhost/contactDance');

const port = 5000;

//define mongoose schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dsec: String
});
var Contact = mongoose.model('contact', contactSchema);

app.use(express.static('static', ))

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const params={ }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params={ }
    res.status(200).render('contact.pug');
})
app.get('/services', (req, res)=>{
    const params={ }
    res.status(200).render('services.pug');
})
app.get('/about', (req, res)=>{
    const params={ }
    res.status(200).render('about.pug');
})
app.get('/class', (req, res)=>{
    const params={ }
    res.status(200).render('class.pug');
})




app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("this item was not saved to database");
    });
   
   
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});