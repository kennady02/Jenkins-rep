var express = require('express');
var routing = express.Router();
var FlightBookingBL = require('../public/javascripts/FlightBookingBL');
var Flight = require('../public/javascripts/Flight');
var FlightBooking = require('../public/javascripts/FlightBooking');

//Insert and update
routing.post('/bookFlight', function (req, res, next) {
    var flightBooking = FlightBooking.toObject(req.body);
    FlightBookingBL.bookFlight(flightBooking).then(function (bookingId) {
        console.log(bookingId);
        res.json({ "message": "Flight booking is successful with booking Id :"+bookingId});
    }).catch(function (err) {
        next(err);
    })
})

//to view details of a particular booking Id
routing.get('/viewBooking/:id', function (req,res,next) {
    var flightBooking = FlightBooking.toObject(req.body);
    FlightBookingBL.retrieveBooking(req.params.id).then(function (flight) {
        res.json({"message":"Details found successfully for booking Id: " +flight.bookingId, "bean":flight});
    }).catch(function (err) {
        next(err);
    })
})

routing.get('/getallId', function(req,res,next){
   // console.log("req recived")
    FlightBookingBL.getAllBookingId().then(function(bookings){
       
       res.json(bookings)
   }).catch(function(){
       next(err)
   })
})

routing.post('/delete', function(req,res,nex){
    //console.log(req.params.id)
   // parseInt()
   console.log("requesting")
    console.log("request to delete bookingId ",req.params.id)
    var id=parseInt(req.body.id)
    FlightBookingBL.deleteBooking(id).then(function(response){
        console.log("in routing",response.result.n)
        if (response.result.n>0){
        res.json({"message":"Successfully deleted Id: "+id})}
        else{
            throw new Error("Sorry Cannot delete Id: "+id)
           // res.json({"message":"Sorry Cannot delete Id: "+id})
        }
    }).catch(function(err){
        console.log(err)
       next(err)
    })
})


module.exports = routing;