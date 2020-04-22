const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    //Iteration 2 
    Recipe.create({
      title: "New Recipe",
      level: "Easy Peasy",
      ingredients: [ "cebola", "farinha", "azeite", ],
      cuisine: "Brazil",
      dishType: "main_course" ,
      image: "https://images.media-allrecipes.com/images/75131.jpg" ,
      duration: 50,
      creator: "Chef Nayhara Luiza",
      created: 04/21/2020
    })
    .then((recipe) => { console.log('The recipe is saved and its title is: ', recipe.title) })
    .catch((err) => { console.log('An error happened:', err) });
  })

  //Iteration 3
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) =>
      recipes.forEach((recipe) => {
        console.log("A new recipe was added:", recipe.title) })
      )
      .catch((err) => { console.log('An error happened:', err) });
  })

  //iteration 4
  
  Recipe.updateOne(
    {title: 'Rigatoni alla Genovese'}, 
    {duration :100})
  .then(console.log('recipe changed successfully'))
  .catch((err => {console.log(`and ${err} was found`) })
  )

  //iteration 5

  Recipe.deleteOne(
    {title:'Carrot Cake'})
  .then(console.log('Recipe deleted successfully'))
  .catch((err) => { console.log("An error happened", err)})

  console.log(data)
  //iteration 6
  mongoose.disconnect(() => console.log('disconnected succesfully'))



  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });