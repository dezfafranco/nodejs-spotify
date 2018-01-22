'use strict'

var path = require('path');
var fs= require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album= require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
  var artistId = req.params.id;

  Artist.findById(artistId,(err,artist) => {
    if(err) {
      res.status(200).send({message: "Error en la petición"});
    } else {
      if(!artist) {
        res.status(404).send({message: "El artistas no existe"});
      } else {
        res.status(200).send({artist});
      }
    }
  });

}

function getArtists(req,res) {
  if(req.params.page) {
      var page = req.params.page;
  } else {
    var page = 1;
  }

  var ItemsPerPage = 3;

  Artist.find().sort('name').paginate(page,ItemsPerPage,(err,artists,total) => {
    if(err) {
        res.status(504).send({message: "Error en la petición"});
    } else {
      if(!artists) {
        res.status(404).send({message: "No hay artistas"});
      } else {
        return res.status(200).send({
          totalItems:total,
          artists: artists
        });
      }
    }
  });
}

function saveArtist(req,res) {
  var artist = new Artist();

  var params = req.body;
  artist.name = params.name;
  artist.description = params.description;
  artist. image = 'null';

  artist.save((err,artistStored) => {
    if(err) {
        res.status(500).send({message: "Error al guardar el artista"});
    } else {
      if(!artistStored) {
        res.status(404).send({message:"No se pudo guardar el artista"});
      } else {
        res.status(200).send({artist:artistStored});
      }

    }
  });

};

function updateArtist(req,res) {
  var artistId = req.params.id;
  var update = req.body;

  Artist.findByIdAndUpdate(artistId, update,(err,artistUpdated) => {
     if(err) {
       res.status(500).send({message: "Error al editar el artista"});
     } else {
       if(!artistUpdated) {
         res.status(404).send({message:"No se pudo editar el artista"})
       } else {
         res.status(200).send({artist:artistUpdated});
       }
     }
  });
}

function uploadImage(req,res) {

  var artistId = req.params.id;
  var file_name = "No subido";

  if(req.files) {
     var file_path = req.files.image.path;
     var file_split = file_path.split('\\');
     var file_name = file_split[2];

     var ext_split = file_name.split('\.');
     var file_ext = ext_split[1];

     if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

       Artist.findByIdAndUpdate(artistId, {image:file_name},(err,artistUpdated) => {
         if(!artistUpdated) {
           res.status(404).send({message: 'No se ha podido actualizar el artista'});
         } else {
           res.status(200).send({artist:artistUpdated});
         }
       });

     } else {
       res.status(200).send({message:"Extensión del archivo no válida"});
     }
  } else {
    res.status(200).send({message:"No has subido ninguna imagen..."})
  }

}

function getImageFile(req,res) {
  var image_file = req.params.imageFile;
  var path_file = './uploads/artists/' + image_file;
  fs.exists(path_file, function(exists){
    if(exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({message:"No existe la iamgen..."})

    }
  });
}



module.exports = {
  getArtist,
  getArtists,
  saveArtist,
  updateArtist,
  uploadImage,
  getImageFile
};
