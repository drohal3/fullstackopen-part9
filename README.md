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


