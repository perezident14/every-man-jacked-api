# ARCHIVED
Check out the current state of this app [here](https://github.com/p14/every-man-jacked-api).

# Every Man Jacked (API)

Every Man Jacked is a workout tool that helps users structure their own workouts with specific goals for strength in mind. This API handles the data flow for CRUD functionality surrounding exercises, workouts, users, and authentication.

This application is built using Node, Express, and TypeScript for a quick and concise experience. This application was built with the purpose of improving technical skills and educating others with a simple and clean workflow.

## Getting Started

### Installing

* Run `npm install`
* Create a MongoDB Cluster
* Create a `.env` file in the root directory with the following variables (substitute appropriate values):

```
PORT=4000
DB_URI={YOUR_DB_URL}
JWT_SECRET={YOUR_RANDOM_SECRET}
SALT_ROUNDS=12
```

### Executing Program
* Run `npm run start`
* Open [http://localhost:4000](http://localhost:4000) to view it in the browser
