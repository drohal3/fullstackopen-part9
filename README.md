# Fullstack Open - Part9: TypeScript
Part 9 of the Full Stack online course https://fullstackopen.com/en/part9

## Setup

Exercises 9.1-9.7. will all be made in the same node project. Create the project in an empty directory with npm init and install the ts-node and typescript packages. Also, create the file tsconfig.json in the directory with the following content:
```
{
    "compilerOptions": {
        "noImplicitAny": true,
    }
}
```
The compiler option noImplicitAny makes it mandatory to have types for all variables used. This option is currently a default, but it lets us define it explicitly.

## Exercise 9.1 Body mass index
**Task:**
Create the code of this exercise in the file bmiCalculator.ts.

Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code
```
console.log(calculateBmi(180, 74))
```
should print the following message:
```
Normal (healthy weight)
```
Create an npm script for running the program with the command npm run calculateBmi.

**Solution:**
Implemented as instructed.

``` 
npm run calculateBmi 175 75 
```
returns
```
Normal range
```

## Exercise 9.2 Exercise calculator
**Task:**
Create the code of this exercise in file exerciseCalculator.ts.

Write a function calculateExercises that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object that includes the following values:

- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating

The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:
```
[3, 0, 2, 4.5, 0, 3, 1]
```
For the Result object, you should create an interface.

If you call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2, it should return:
```
{ periodLength: 7,
trainingDays: 5,
success: false,
rating: 2,
ratingDescription: 'not too bad but could be better',
target: 2,
average: 1.9285714285714286 }
```
Create an npm script, npm run calculateExercises, to call the function with hard-coded values.

**Solution:**
Implemented as instructed.

## Exercise 9.3 Command line
**Task:**
Change the previous exercises so that you can give the parameters of bmiCalculator and exerciseCalculator as command-line arguments.

Your program could work eg. as follows:
```
$ npm run calculateBmi 180 91

Overweight
```
and:
```
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
trainingDays: 6,
success: false,
rating: 2,
ratingDescription: 'not too bad but could be better',
target: 2,
average: 1.7222222222222223 }
```
In the example, the first argument is the target value.

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

**Solution:**
Parameters as arguments already implemented in previous exercises. The exerciseCalculator needed to be refactored to accept daily hours in different format.

## Exercise 9.4 Express
**Task:**
Add Express to your dependencies and create an HTTP GET endpoint hello that answers 'Hello Full Stack!'

The web app should be started with the commands npm start in production mode and npm run dev in development mode. The latter should also use ts-node-dev to run the app.

Replace also your existing tsconfig.json file with the following content:
```
{
"compilerOptions": {
"noImplicitAny": true,
"noImplicitReturns": true,
"strictNullChecks": true,
"strictPropertyInitialization": true,
"strictBindCallApply": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitThis": true,
"alwaysStrict": true,
"esModuleInterop": true,
"declaration": true,
}
}
```
Make sure there aren't any errors!

**Solution:**
Implemented as instructed.

URL http://127.0.0.1:3003/hello responds ***Hello Fullstack!***.

## Exercise 9.5 WebBMI
**Task:**
Add an endpoint for the BMI calculator that can be used by doing an HTTP GET request to the endpoint bmi and specifying the input with query string parameters. For example, to get the BMI of a person with a height of 180 and a weight of 72, the URL is http://localhost:3002/bmi?height=180&weight=72.

The response is a JSON of the form:
```
{
weight: 72,
height: 180,
bmi: "Normal (healthy weight)"
}
```
See the [Express documentation](http://expressjs.com/en/5x/api.html#req.query) for info on how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, a response with proper status code and an error message is given:

{
error: "malformatted parameters"
}
Do not copy the calculator code to file index.ts; instead, make it a [TypeScript module](https://www.typescriptlang.org/docs/handbook/modules.html) that can be imported into index.ts.

## Exercise 9.6 Eslint
**Task:**
Configure your project to use the above (in the course materials) ESlint settings and fix all the warnings.

**Solution:**
Eslint installed. Errors/warnings listed when running ```npm run lint``` were fixed.

## Exercise 9.7 WebExercises
**Task:**
Add an endpoint to your app for the exercise calculator. It should be used by doing an HTTP POST request to endpoint exercises with the input in the request body:
```
{
"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
"target": 2.5
}
```
The response is a JSON of the following form:
```
{
"periodLength": 7,
"trainingDays": 4,
"success": false,
"rating": 1,
"ratingDescription": "bad",
"target": 2.5,
"average": 1.2142857142857142
}
```
If the body of the request is not in the right form, a response with the proper status code and an error message are given. The error message is either
```
{
error: "parameters missing"
}
```
or
```
{
error: "malformatted parameters"
}
```
depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertible to numbers.

In this exercise, you might find it beneficial to use the explicit any type when handling the data in the request body. Our ESlint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:
```
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```
You might also get in trouble with rules no-unsafe-member-access and no-unsafe-assignment. These rules may be ignored in this exercise.

Note that you need to have a correct setup to get the request body; see [part 3](https://fullstackopen.com/en/part3/node_js_and_express#receiving-data).

**Solution:**
Implemented as instructed and used different libraries for logging (morgan and winston) and relaxing API security requirements (cors)

## Before you start the exercises
For this set of exercises, you will be developing a backend for an existing project called Patientor, which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.

The [frontend](https://github.com/fullstack-hy2020/patientor) has already been built by outsider experts and your task is to create a backend to support the existing code.

## 9.8: Patientor backend, step1
**Task:**
Initialize a new backend project that will work with the frontend. Configure eslint and tsconfig with the same configurations as proposed in the material. Define an endpoint that answers HTTP GET requests for route /api/ping.

The project should be runnable with npm scripts, both in development mode and, as compiled code, in production mode.

**Solution:**
Implemented as instructed.

## Exercise 9.9: Patientor backend, step2
**Task:**
Fork and clone the project [patientor](https://github.com/fullstack-hy2020/patientor). Start the project with the help of the README file.

You can run this command if you get an error message when trying to start the frontend:
```
npm update chokidar
```
You should be able to use the frontend without a functioning backend.

Ensure that the backend answers the ping request that the frontend has made on startup. Check the developer tools to make sure it works:

image: dev tools showing ping failed

You might also want to have a look at the console tab. If something fails, [part 3](https://fullstackopen.com/en/part3) of the course shows how the problem can be solved.

**Solution:**
Implemented as instructed. 
```
app.get('/api/patients', (_req, res) => {
    // console.log('someone pinged here');
    res.send([]);
});
```
Added to solve an 404 error.

## Exercises 9.10-9.11
Similarly to Ilari's flight service (course materials), we do not use a real database in our app but instead use hardcoded data that is in the files [diagnoses.json](https://github.com/fullstack-hy2020/misc/blob/master/diagnoses.json) and [patients.json](https://github.com/fullstack-hy2020/misc/blob/master/patients.json). Get the files and store those in a directory called data in your project. All data modification can be done in runtime memory, so during this part, it is not necessary to write to a file.

## Exercise 9.10: Patientor backend, step3
**Task:**
Create a type Diagnose and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

Note that diagnoses may or may not contain the field latin. You might want to use [optional properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties) in the type definition.

**Solution:**
Implemented as instructed.

## Exercise 9.11: Patientor backend, step4
**Task:**
Create data type Patient and set up the GET endpoint /api/patients which returns all patients to the frontend, excluding field ssn. Use a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html) to make sure you are selecting and returning only the wanted fields.

In this exercise, you may assume that field gender has type string.

Try the endpoint with your browser and ensure that ssn is not included in the response.

**Solution:**
Created Gender type even though I could assume it was a string. Used Omit<...> utility type to omit ssn from patient entries and Array.map to ensure the ssn is not exposed.

Implemented together with previous exercise.