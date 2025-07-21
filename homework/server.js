const express=require('express')

const app=express()
const morgan=require("morgan")

app.use(morgan('dev'))


const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];





app.use((req, res, next) =>{
    console.log('I am the middleware hear me roar....')
    if(Object.keys(req.params).length > 0){
        console.log('I got params')
    }
    next()
})

app.get('/',(req,res)=>{
console.log(req)
res.send('hello world')

})





app.get('/home',(req,res)=>{
console.log(req)
res.send('this is the home test')

})


app.get('/greetings/name',(req,res)=>{
console.log(req)
res.send('Hello there, Christy!')

})



app.get('/roll/:itemNumber',(req,res)=>{
    const numberparam=req.params.itemNumber
    const number=parseInt(numberparam)
        console.log(req)

if(numberparam/numberparam!==(0||1)){
    res.send('your should fix your number')
    
}
else{
    const randomNumber = Math.floor(Math.random() * (number + 1));

    res.send('your number is fine'+" you enrolled "+randomNumber)


    
}

})



app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  
  if (isNaN(index) || index < 0 || !Number.isInteger(index)) {
    return res.status(400).send('Please provide a valid positive integer index');
  }
  
  if (index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');
  }
  
  const item = collectibles[index];
  
  res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`);
});




app.get('/shoes', (req, res) => {
    let filteredShoes = [...shoes]; 
    
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        if (!isNaN(minPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
        }
    }
    
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        if (!isNaN(maxPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
        }
    }
    
    if (req.query.type) {
        filteredShoes = filteredShoes.filter(shoe => 
            shoe.type.toLowerCase() === req.query.type.toLowerCase()
        );
    }
    
    res.json(filteredShoes);
});







app.listen(3000, ()=>{
    console.log("every thing is ok in the server...")
})