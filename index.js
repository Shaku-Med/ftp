 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const axios = require('axios');
 const { Medzy } = require('medenc')
 const multer = require('multer');
 const fs = require('fs');
 const path = require('path');

 let save = []

 app.use(express())

 app.use(
     cors({
         origin: '*',
     })
 );

 app.use(bodyParser.json() || bodyParser.urlencoded({ extended: false }));


 //


 let currentDate = new Date()
 currentDate.setDate(currentDate.getDate() + 2)

 function RemoveSave() {
     try {
         if (save.length > 0) {
             let cud = new Date()

             for (let i = save.length - 1; i >= 0; i--) {
                 const item = save[i];

                 if (item.time <= cud) {
                     save.splice(i, 1)
                         //  
                     let pat = `./File/${req.params.id}`;
                     fs.unlink(pat, (er) => {
                         if (er) {}
                     })
                 }
             }
         }
     } catch {}
 }

 setInterval(RemoveSave, 5000)



 // 

 app.get('/', async(req, res) => {
     res.sendFile(__dirname + '/index.html');
 })

 app.get('/js', async(req, res) => {
     res.sendFile(__dirname + '/code.js')
 })

 app.get('/css', async(req, res) => {
     res.sendFile(__dirname + '/css.css')
 })

 app.get(`/api/data`, (req, res) => {
     if (save.length > 0) {
         let sv = save.filter(s => s.network === req.headers['x-forwarded-for'])
         if (sv !== undefined && sv.length > 0) {
             res.send(sv)
         } else {
             req.destroy()
             res.destroy()
         }
     } else {
         req.destroy()
         res.destroy()
     }
 })

 app.get(`/:id`, (req, res) => {
     try {
         let pat = `./File/${req.params.id}`
         res.setHeader('Content-Type', req.query.type);
         res.sendFile(path.resolve(pat))
     } catch {
         req.destroy()
         res.destroy()
     }
 })

 //

 let storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, './File/')
     },
     filename: (req, file, cb) => {
         let type = file.mimetype
         let id = req.params.id
             //  
         cb(null, `${id}.${type.split('/')[1]}`)
     }
 })

 let upload = multer({
     storage: storage
 })

 app.post(`/api/:type/data/:id`, async(req, res) => {
     try {
         upload.single('file')(req, res, (er) => {

             let dt = new Date()
             dt.setDate(dt.getDate() + 2);

             let fil = {
                 file: req.file.filename,
                 type: req.file.mimetype,
                 id: req.params.id,
                 time: dt,
                 network: req.headers['x-forwarded-for']
             }

             save.push(fil)

             res.send({
                 path: req.file.filename
             })

         })
     } catch {
         res.destroy()
         req.destroy()
     }
 })

 app.listen(3001, () => {
     console.log("Good")
 })