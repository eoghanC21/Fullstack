const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema(
    {
        title: {
            type: String,
            enum: ['Dr','Mx', 'Ms', 'Mr', 'Mrs', 'Miss'],
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
          email: {
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
        other: {
        type: String
        }
    }
)

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;