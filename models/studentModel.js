const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss'],
            required: true
          },
          firstName: {
            type: String,
            required: true
          },
          surName: {
            type: String,
            required: true
          },
          phoneNumber: {
            type: String,
            required: true
          },
          emailAddress: {
            type: String,
            required: true
          },
          addressLine1: {
            type: String,
            required: true
          },
          addressLine2: String,
          town: {
            type: String,
            required: true
          },
          countyCity: {
            type: String,
            required: true
          },
          eircode: {
            type: String,
            required: true
          },
          dateOfBirth:{
            type: Date,
            required: true           
          },
          parentGuardianName:{
            type: String,
            required:false
      
          },
          virtualAttendencePermission:{
            type: String,
            enum: ['Yes','No'],
            required: true
          },
          subject:{
            type: String,
          },
          gender:{
            type: String, 
            enum:['Male','Female']
          },
          other: {
            type: String
          }
    }, 

    { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;