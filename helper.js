exports.success = (message,data) => {return {message, data}}

//Ajout ici car méthode outil


exports.getUniqueId=(pokemons)=>{
    const pokemonsIds= pokemons.map(pokemon=>pokemon.id)
    //Récupérer la   valeur la plus haute
    const maxId= pokemonsIds.reduce((a,b)=>Math.max(a,b))
    const uniqueId = maxId+1
    return uniqueId
}
