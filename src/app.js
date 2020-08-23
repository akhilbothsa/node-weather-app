const path = require('path');
const hbs = require('hbs')
const express = require('express');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
const port = process.env.PORT || 3000


// Define path for express directories
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup Hadle bar engine & Views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, response)=>{
    response.render('index', {
        title: 'Weather App',
        name: 'Akhil'
    })
})

app.listen(port, ()=>{
    console.log('Server Started')
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
      return  res.send({error: 'Please provide address'})
    }

    geoCode(req.query.address, (error, data)=>{
        if(error) return res.send(error);
        const {Latitude, Longitude} = data;
        forecast(Latitude, Longitude, (error, data)=>{
            if(error) return res.send(error);
            return res.send(data)
        })
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About Page'})
    // res.sendFile(`${publicDirectory}/about.html`)
})

app.get('/about/*', (req, res)=>{
    res.render('abou-child-404')
})

app.get('*', (req, res)=>{
    res.render('404')
})