var mongoose = require('mongoose')



const ticketSchema = new mongoose.Schema({
    ticket_desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps:true
  });
  
  
  
module.exports =mongoose.model("getTicket",ticketSchema)