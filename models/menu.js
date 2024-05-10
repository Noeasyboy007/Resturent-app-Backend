const mongoose = require('mongoose');


// Create a mongoose Schema***********************
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: this,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        default: ['Sweet', 'Spicy', 'Sour'],
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    }

})

// Create a mongoose Model*******************************
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem