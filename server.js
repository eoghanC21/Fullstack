//Eoghan Clancy : 20365423
//Made in VSCode on Windows 10

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable cross-origin requests
app.use(cors());

//import models
const Tutor = require('./models/tutorModel');
const Student = require('./models/studentModel');
const Tutorial = require('./models/tutorialModel');

//for parsing json
app.use(express.json())

//routes

//eg get all customers (R)
// app.get('/customers', async(req,res) => {
//     try {
//         const customers = await Customer.find({});//empty {} = get all customers
//         res.status(200).json(customers)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

//Create Tutor
app.post('/tutor', async (req, res) => {
    try {
      const tutor = await Tutor.create(req.body);
      res.status(200).json(tutor);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

//Retrieve Tutor by email
app.get('/tutors/:email', async (req, res) => {
  try {
      const { email: email } = req.params;
      const tutor = await Tutor.findOne({ email: email }); 
      if (!tutor) {
        // Tutor not found
        return res.status(404).json({ message: `Cannot find any tutor with email ${email}` });
      }
      res.status(200).json(tutor);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

//update Tutor by email
app.put('/tutors/:email', async(req, res) => {
  try {
      const {email} = req.params;
      const tutor = await Tutor.findOneAndUpdate({email: email}, req.body);
      //cannot find that customer in database
      if(!tutor){
          return res.status(404).json({message: `cannot find any tutors with email ${email}`})
      }
      const updatedTutor = await Tutor.findOne({email: email});
      res.status(200).json(updatedTutor);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

//Delete a tutor by email
app.delete('/tutors/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const tutor = await Tutor.findOneAndDelete({ email: email });
    if (!tutor) {
      // Tutor not found
      return res.status(404).json({ message: `Cannot find any tutor with email ${email}` });
    }
    // Tutor successfully deleted
    res.status(200).json(tutor);
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: error.message });
  }
});

//Create Student
app.post('/student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Retrieve Student by email
app.get('/students/:email', async (req, res) => {
  try {
    const { emailAddress: email } = req.params;
    const student = await Student.findOne({ email: email }); 
    if (!student) {
      // Student not found
      return res.status(404).json({ message: `Cannot find any student with email ${email}` });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update student by email
app.put('/students/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOneAndUpdate({ emailAddress: email }, req.body);
    // Cannot find that student in the database
    if (!student) {
      return res.status(404).json({ message: `Cannot find any student with email ${email}` });
    }
    const updatedStudent = await Student.findOne({ emailAddress: email });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a student by email
app.delete('/student/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOneAndDelete({ emailAddress: email });
    if (!student) {
      // student not found
      return res.status(404).json({ message: `Cannot find any student with email ${email}` });
    }
    // Tutor successfully deleted
    res.status(200).json(student);
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: error.message });
  }
});

//Create tutorial
app.post('/tutorial', async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(200).json(tutorial);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery",false)// controls whether Mongoose should throw an error if attempt to query MongoDB with invalid field
mongoose.connect('mongodb+srv://eoghan1284:Complexity7132K14@cluster0.738tjud.mongodb.net/CodingExamDB?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log("App is running on port 3000")
    });
}).catch(error => {
    console.log(error);
});

// Retrieve tutorial info based on number and subject
app.get('/tutorials/:number/:subject', async (req, res) => {
  try {
    const { number, subject } = req.params;
    const tutorial = await Tutorial.findOne({ tutorialNumber: number, tutorialSubject: subject });
    
    if (!tutorial) {
      // Tutorial not found
      return res.status(404).json({ message: `Cannot find any tutorial with number ${number} and subject ${subject}` });
    }
    
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete tutorial
app.delete('/tutorials/:number/:subject/:tutor', async (req, res) => {
  try {
    const { number, subject, tutor } = req.params;
    const tutorial = await Tutorial.findOneAndDelete({ tutorialNumber: number, tutorialSubject: subject, tutor: tutor });
    
    if (!tutorial) {
      // Tutorial not found
      return res.status(404).json({ message: `Cannot find any tutorial with number ${number}, subject ${subject}, and tutor ${tutor}` });
    }
    
    res.status(200).json({ message: `Tutorial deleted successfully: ${tutorial}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


