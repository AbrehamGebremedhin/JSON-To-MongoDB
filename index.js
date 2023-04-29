const connectDB = require('./config/connectDB');
const fs = require('fs');
const path = require('path');
const colors = require('colors');


// Create a model for the mongodb document and import it here
const Recipe = require('./Recipe');

// Connects to a mongodb database, to change the connection url go to "./config/connectDB.js" and paste your db connection url
connectDB();
let recipe;

//Add a file path here
const directoryPath = path.join(__dirname, `index`);

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(async function (file) {
        //Converting .JSON files to an JS object
        try {
            recipe = await JSON.parse(
                fs.readFileSync(`${directoryPath}/${file}`, 'utf-8')
            );
        } catch (err) {
            return false;
        }

        //Adding the model to the database
        await Recipe.create(recipe);
        console.log('Data Imported...'.green.inverse);
    });
});

