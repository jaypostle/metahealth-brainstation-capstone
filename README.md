# metahealth-brainstation-capstone
A Full-stack React/Express.js app helping you discover the impact of food on your body.

Capstone project for BrainStation Web Development program. MetaHealth's primary purpose is to help people track their long-term health trends based on their diet. The app will support them with meal prepping and shopping based on these goals. 

## About the app:
This work was the capstone project for the BrainStation Web Development program. It was a 2-week sprint to show off our skills from the previous 3 months of learning and projects. MetaHealth's primary purpose is to help people track their long-term health trends based on their diet. The app supports users with meal prepping and shopping based on these goals.

- Tracks your health trends based on your diet
- Supports you to meal prep and shop based on the visualized health trends

For example, a user can filter recipes for ‘vegetarian’, ‘allergic to nuts’, and ‘high iron diet’ and will be shown recipes that meet those requirements in a usable meal planning interface. Nutrition stats will be drawn from the recipes and will be visually graphed based on the RDA. Then, you will be asked to track your sleep quality, energy levels, feeling of contentedness, and exercise on a scale of 1-10. Finally, they will be able to visualize those weekly health points alongside what they’ve been eating. The goal of both sets of data is to attempt to draw correlations between, for example, increased iron or reduced dairy with their mood/sleep/happiness.

## Presentation Slides Link
https://docs.google.com/presentation/d/1vVz0LS1pe-3RQD_WHGb6HvFuzZITFK3NTcVthK4P3RI/edit?usp=sharing

## Screenshots
![chart-clicking](https://user-images.githubusercontent.com/50502972/214367542-e3848a74-9484-4ddb-8095-1820be83d0df.gif)
![discover-recipes-flow](https://user-images.githubusercontent.com/50502972/214368928-535a0eb1-d7e1-495a-8aea-70ab8e4fe0af.gif)

## Developer installation instructions

### Set up the db
Create a .env file with the following contents:
```js
DB_LOCAL_DBNAME = "<your_db_username>";
DB_LOCAL_USER = "<your_db_password>";
DB_LOCAL_PASSWORD = "<your_db_password>";
PORT = 8080;
```

- Create a new MySQL Database called 'metahealth'. Once you have a database to use, update the `.env` file again with your user, password, and database information.


Seed your data
- Run npx knex seed:run to execute all seed files and add seed data to the database and each table.

If you have to create your migrations and tables first:
- For each table, run 'npx knex migrate:make [schema name]' replacing schema name with users, mealplans, nutritiondata, journalentries. But these should already be populated with a clone from GitHub.

Start your server
- cd into the server folder
- npm run server

Start your client
- cd into the client folder
- npm start

## Tech Stack
Backend built in javascript with node.js/express.js, a MySQL database connected with Knex.js. The frontend was built in React.js with the Chart.js library for charting.

## What I learned
Beyond spending more time learning how a full-stack app with Express.js and React functions together, I learned how to create complex relational databases and how to structure and create their routes intuitively with Knex.js. I learned how to set up useContext to manage state components easily without prop drilling. I learned how to build good-looking and functional charts with a great library. Most importantly, I learned how to connect 4 different sets of schemas and routes together on the front-end.

## Potential Future Improvements:

### Data

- Ability to edit meal plans and journal entries
- Add Auth and Google sign-in

### Functionality

- Add RDA based on your demographic
- Search entered meal plans and journal entry notes
- Adjust servings to change total nutrition volume

### Discover & Charts

- Sort meals by nutrition e.g. high iron
- Sort meals by nutrition e.g. high iron Display journal entries and meal plans on chart click
- Toggle charts based on time frames


## Portfolio Link
See more details about the project on my portfolio:
https://jaysonpostle.digital/portfolio/metahealth
