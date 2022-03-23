
# Séptimo Arte Estudios

A web application server side render, using IMDB API, cloudinary, bcrypt authentication.
On this application you will be able to find films, add to favorites and create a small social network.



## Run Locally

Clone the project

```bash
  git clone https://github.com/valdelvira/septimo-arte-estudios.git
```

Go to the project directory

```bash
  cd septimo-arte-estudios
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Tech Stack

**Server:** Handlebars, Node, Express, Bcrypt

**Data base:** MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

IMDB API Key:

`API_KEY_DEV`

Cloudinary credentials:

`CLOUDINARY_NAME`

`CLOUDINARY_KEY`

`CLOUDINARY_SECRET`

Expresion to hash the sessionID

`SESS_SECRET`

Variable from the process.env object 

`NODE_ENV`

Mongo DB conection string

`MONGODB_URI`
## Authors

- [@Guillecalero](https://www.github.com/guillecalero)
- [@Valdelvira](https://www.github.com/valdelvira)


