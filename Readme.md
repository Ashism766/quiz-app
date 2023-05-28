# Quiz API Endpoints

This is a RESTful API that provides endpoints for managing quizzes.

## Installation

1. Clone the repository.
```sh
  git clone https://github.com/Ashism766/quiz-app.git
```
2. Install dependencies by running `npm install`.
```sh
  cd quizz-app
  npm i 
```
3. Set up the required environment variables (e.g., database connection) in a `.env` file.
   Add mongodb uri inside .env file, `example` below
```sh
  MONGO_URI  = 'mongodb://localhost:27017/quizapp'
```
4. Start the server by running `npm `.
```sh
  npm start
```

## Directory Structure
```bash
.
├── Readme.md
├── app
│   ├── controller
│   │   └── controller.js
│   ├── model
│   │   └── quizModel.js
│   ├── routes
│   │   └── quizRoutes.js
│   └── utility
│       ├── cache.js
│       ├── cornUpdate.js
│       └── requestLimit.js
├── main.js
├── package-lock.json
└── package.json
```

## Endpoints

### Create a Quiz
Create a new quiz.
```http
 POST /quizzes
 ```
- **Request Body:**
  - `question` (string, required): The question for the quiz.
  - `options` (array, required): An array of options for the quiz.
  - `rightAnswer` (number, required): The index of the correct answer in the options array.`between 1 to 4`
  - `startDate` (date, required): The start date of the quiz. `YYYY-MM-DDTHH:MM:SS`
  - `endDate` (date, required): The end date of the quiz.  `YYYY-MM-DDTHH:MM:SS`

#### Example of Post request Body
```json
{
  "question": "what's the name of national animal of India?",
  "option": ["bengal tiger", "peecock", "dog", "lion"],
  "rightAnswer": 1,
  "startDate": "2023-05-28T17:50:02",
  "endDate": "2023-05-28T17:55:02",
}
```

### Get Active Quizzes
Retrieve the list of active quizzes.
```https
GET /quizzes/active
```
- **Response:** An array of active quizzes.
  - `question` (string): The question for the quiz.
  - `options` (array): An array of options for the quiz.
  - `rightAnswer` (number): The index of the correct answer in the options array.
  - `startDate` (date): The start date of the quiz.
  - `endDate` (date): The end date of the quiz.

### Get Quiz Result

Retrieve the result of a specific quiz.
```https
`GET /quizzes/:id/result`
```
- **Path Parameters:**
  - `id` (string, required): The ID of the quiz.
- **Response:** The result of the quiz.

### Get All Quizzes

Retrieve all quizzes.
```https
GET /quizzes/all
```
- **Response:** An array of all quizzes.
  - `question` (string): The question for the quiz.
  - `options` (array): An array of options for the quiz.
  - `rightAnswer` (number): The index of the correct answer in the options array.
  - `startDate` (date): The start date of the quiz.
  - `endDate` (date): The end date of the quiz.

## Caching

Caching is implemented in this API to improve performance and reduce database queries. The active quizzes and all quizzes are cached for a specific duration (30 seconds by default) using a caching mechanism.

Caching is utilized in the following endpoints:
- `GET /quizzes/active`
- `GET /quizzes/all`
- `GET /quizzes/id/result`

When these endpoints are called, the API first checks if the data is available in the cache. If it is, the cached data is returned directly. If the data is not cached or has expired, the API retrieves the data from the database, caches it, and then returns the data.

The caching mechanism is implemented using a dedicated caching system or a custom caching solution.

## Error Handling

- If an error occurs during quiz creation, a 500 Internal Server Error response is returned.
- If no active quizzes are found, a 404 Not Found response is returned.
- If a specific quiz is not found, a 404 Not Found response is returned.
- If there is an error retrieving the quiz result, a 500 Internal Server Error response is returned.
- If no quizzes are found, a 404 Not Found response is returned.

Please note that the provided error handling is basic and can be enhanced based on specific requirements.

