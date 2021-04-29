var express = require('express')
  , bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(express.static('./'));
app.use(express.static(__dirname + "/views")); 
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
})); 


let courses = [
{ name: 'course', code:'123abc', description:'Ai intellegince',id:1},
{ name: 'multimedia', code:'def456', description:'computer graphics',id:2}
];

//rendering student and courses forms.
app.get('/web/students/create', function(req, res){
    
   return res.render('./students.ejs',{title: "student input"});
});

app.get('/web/courses/create', function(req, res){
    return res.render('./courses.ejs',{title: "course input"});
});


//courses operations

//get all courses
app.get('/api/courses/', (req, res) => {
    res.send(courses)
  });
//deleteing
app.delete('/api/courses/', function(req, res){
    i = courses.findIndex(course => course.id == req.body.id)
    courses.splice(i,1)
    res.json({"courses":courses})
    
});
//update a course
app.put('/api/courses/', function(req, res){
    i = courses.findIndex(course => course.id == req.body.id)
    courses[i] = req.body
    res.json({"courses":courses})
});
//create a course
app.post('/api/courses/', function(req, res){
    
    new_course = req.body
    new_course['id'] = courses.length + 1
    courses.push(new_course)
    res.setHeader('Content-Type', 'application/json');
    res.json({"courses":courses})
});


//app.post('/create/', (req, res) => {
  //  return res.redirect('./courses.ejs');
    // create a new course object

//});

//get all courses

app.get('/api/courses/', (req, res) => {
  res.send(courses)
});

//get certain course
app.get('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  res.status(404).send('the course is not found');
    res.send(course);

});


app.get('/',(req, res)=>{
    res.send ('hello world');

});

app.get('/api/courses',(req, res) => {
    res.send([1, 2, 3]);
}
);




const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listenning on port ${port}...`

));