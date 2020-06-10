# wongnai-challenge


# How we test


## Testing Tools: Apache JMeter or similar at 100 concurrent connections

## We’ll run load testing at the Editing Review endpoint and check the result against our internal dataset. 

## The edited review must be searchable using a food keyword that exists in the body. 

## Your system must also highlight and show the correct review body.

## http://localhost:5555

## docker-compose -f docker-compose.yml up -d


# Document


## 1. We can read a review by specifying review ID through the web application and the result of that review must be shown correctly. 

## 2. We can also search reviews by specifying a food menu keyword (System must allow us to search using only the food keyword we gave in the list, you can return an empty result or throw an error if the keyword is not matched). The result would be one or multiple reviews and the keyword on the review description must be highlighted. (Food keywords can be found at food_dictionary.txt.)

## 3. There should be an option to allow anyone to edit the review description on the web application. The system must be in a consistent state even if there are concurrent editing requests for the same review.

## you should complete it within 7 days after you have started.

## https://drive.google.com/file/d/1QhMMzVK1R0SvXxnABK_TBlNQpNjKMwQg/view

## https://careers.wongnai.com/development/wechallenge1


# Technical Requirements


## choose any technology you prefer. 

### Java with Spring

### Python with Django

### Node.js with Express.js

### Go with stdlib

## Allows all frontend technologies and frameworks.

### just make it secure and just work.

## Use git on your project, commit wisely, make your commits history clean. You can use any git branching strategy.

## Write unit tests, aim for most coverages, both line and branches.  Write tests only backend-side.

## Project will be deployed using docker and docker-compose.  Write docker and docker-compose for us to check it easily.


# API Specification 


## Search Review By Food Text

### Method: GET

### Path: /reviews?query=:text

### a matching keyword must be highlighted using the <keyword> tag

### given a query keyword fried rice

- “the review body with <keyword>fried rice</keyword> matched”

## Get Review By a Specify Id

### Method: GET

### Path: /reviews/:id

## Editing Review

### Method: PUT

### Path: /reviews/:id


# Datasets


## test_file.csv

### ReviewID: Integer; ID of the review, unique across dataset 

### Review: String; Review text/description, can span for multiple lines. 

###  https://github.com/wongnai/wongnai-corpus/tree/master/review 

## food_dictionary.txt

### Keyword: String; Food keyword 

### Use only first 20,000 rows

### https://github.com/wongnai/wongnai-corpus/tree/master/search 


# New Thing


## How to write Test Case!!

## consistent ?

### Backend

- Version

### Frontend

- ~~Subscribe graphQL~~

	- ~~Live editing~~

