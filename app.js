const express = require('express');
const {success} = require('./helper');
const morgan = require('morgan');
let pokemons = require('./mock-pokemon');
const app = express()
const port = 3000

//Création d'un middleware
app.use(morgan('dev'));
app.get('/',(req,res) =>res.send("Coucou tout le monde !"));
app.get('/api/pokemons/:id',(req,res)=>{
   const id =parseInt(req.params.id);
   const pokemon = pokemons.find (pokemon=>pokemon.id===id);
   let message ='Un pokémon à bien était trouvé.';
   res.json(success(message,pokemon));
});
app.get('/api/pokemons/',(req,res)=>{
    let message='Tout les pokémons on étaient chargé';
    res.json(success(message,pokemons))
})
app.listen(port,()=>console.log("Notre application node est lancée ! "))