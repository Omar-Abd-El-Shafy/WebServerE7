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
{  name: 'course', code:'abc123', description:'Ai intellegince', id:1},
{ name: 'multimedia', code:'def456', description:'computer graphics',id:2}
];

let students = [
{name: 'omar', code: '1500909', id:1}

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

// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

//update
//update a course
// Updating resources
// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code=req.body.code;
    course.description=req.body.description;

    res.send(course);
});
//create a course
app.post('/api/courses/', function(req, res){
    
    new_course = req.body;
    new_course['id'] = courses.length + 1;
    courses.push(new_course);
    res.setHeader('Content-Type', 'application/json');
    res.json({"courses":courses});
});


//get certain course
app.get('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  res.status(404).send('the course is not found');
    res.send(course);

});


app.get('/',(req, res)=>{
    res.send ('welcome to lms');

});

//students part
//get all students
//get all courses
app.get('/api/students/', (req, res) => {
    res.send(students)
  });

//create a student
app.post('/api/students/', function(req, res){
    
    new_student = req.body;
    new_student['id'] = courses.length + 1;
    students.push(new_student);
    res.setHeader('Content-Type', 'application/json');
    res.json({"students":students});
});

//delete a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});

//update a student

app.put('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Update the course 
    // Return the updated course
    student.name = req.body.name;
    student.code=req.body.code;

    res.send(student);
});


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listenning on port ${port}...`
));