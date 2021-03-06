const express = require('express');
const {success,getUniqueId} = require('./helper');
const morgan = require('morgan');
const favicon=require("serve-favicon");
const {Sequelize} = require('sequelize');
const bodyParser = require('body-parser');
let pokemons = require('./mock-pokemon');
const app = express()
const port = 3000
//Initialisation de sequelize
const sequelize = new Sequelize('pokedex','root','root',
    {
        host:'localhost',
        dialect:'mysql',
        dialectOptions:
            {
                timezone:'Etc/GMT-2',
                socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
            },
        logging:false

    })

sequelize.authenticate().then(_=>"La connexion est bonne")
    .catch(error=>console.error('Connexion impossible :'+error))

//Création d'un middleware
app
    .use(favicon(__dirname+'/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
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
//Ajouter un pokemon via l'api rest
app.post('/api/pokemons',(req,res)=>
{
    const id =parseInt(getUniqueId(pokemons))
    const pokemonCreated  = {...req.body,...{id: id, created: new Date()}};
    pokemons.push(pokemonCreated)
    const message = 'Le pokémon à '+pokemonCreated+'bien était crée';
    res.json(success(message,pokemonCreated));
})
//modification d'un pokemon
app.put('/api/pokemons/:id',(req,res)=>
{
    const id =parseInt(req.params.id);
    const pokemonUpdated  ={...req.body,id:id}
    pokemons = pokemons.map(pokemon=>{
        return pokemon.id===id ? pokemonUpdated:pokemon
    })
    const message = 'Le pokemon '+pokemonUpdated+'à bien était modifié.';
    res.json(success(message,pokemonUpdated));
})
app.delete("/api/pokemons/:id",(req,res)=>
{
    const id = parseInt(req.params.id)
    const pokemonDelete=pokemons.find(pokemon=>pokemon.id===id)
    pokemons.filter(pokemon =>pokemon.id!==id)
    const message = 'Le pokémon '+pokemonDelete.name+' à était supprimé';
    res.json(success(message,pokemonDelete))
})
app.listen(port,()=>console.log("Notre application node est lancée ! "))