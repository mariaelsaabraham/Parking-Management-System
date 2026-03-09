const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/book-slot", async (req,res)=>{

 const {vehicle_number, slot_id, time_in, time_out} = req.body;

 const {data,error} = await supabase
  .from("bookings")
  .insert([
   {
    vehicle_number,
    slot_id,
    time_in,
    time_out,
    status:"booked"
   }
  ]);

 if(error){
  return res.json(error);
 }

 res.json({
  message:"Booking successful",
  data
 });

});

app.listen(5000,()=>{
 console.log("Server running on port 5000")
});