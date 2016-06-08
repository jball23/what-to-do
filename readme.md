LOOKING FOR SOMETHING TO DO?

![screenshot 2016-06-08 12 35 59](https://cloud.githubusercontent.com/assets/17213441/15902392/a9360af4-2d75-11e6-9fc7-ae7b0b45414b.png)


Built using the MEAN stack...

To Run App:

1.  Deployed on Heroku here:  https://something-to-do.herokuapp.com/

2.  Clone the repo, cd into what_to_do and run $ npm install from the command line to install dependencies.  Make sure you have the latest version of node installed on your computer to ensure everything runs as program was intended to.

3.  Run $ node db/seed to seed the database.

4.  From command line(any directory, doesn't matter), run $ mongod and then you can minimize that window or tab and just let run in background.

5.  From the what_to_do directory you cloned, run $ nodemon to start the server and to run in your browser locally.

6.  When it's running properly, you should see "Find Something To Do!" in your terminal and your prompt should be hanging.

7.  Visit localhost:3001 in your browser and find Something To Do!


HOW TO USE:

You can look for things to do by clicking on the Search menu item, you can add something to do by clicking on the Add menu item and filling out the form, you can comment on a Todo, you can edit both the comment and the todo, and you can delete the comment or todo.  When you Add something to do, the Google Maps API will geocode the address you entered and place a pin on the map for that address, and it will center the map on that location by default.  

Right now there is no user authentication or accounts so all permissions are available to any user.  
