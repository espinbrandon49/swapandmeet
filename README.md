# EZ-Commerce-Duz-It
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Description 
A front end for an e-commerce site.  I configured a functional Express.js API to use Sequelize to interact with a MySQL database. 

### [GitHub repository](https://github.com/espinbrandon49/EZ-Commerce-Duz-It)

### Tools
JavaScript, Express.js, Node.js, Sequelize, MySQL, Insomnia

## Table of Contents 
  * [Installation](#installation)
  * [Usage](#usage)
  * [Demo Video](#demo)
  * [License](#license)
  * [Contributing](#contributing)
  * [Collaboration](#collaboration)
  * [Questions](#questions)
  
## Installation

Install node.js and NPM on windows, clone down the GitHub repository and install the npm packages.
1. Download and install [Node.js](https://nodejs.org/en/download/)
2. Clone the repository
```bash
git@github.com:espinbrandon49/EZ-Commerce-Duz-It.git
```
3. Run npm install to install the npm dependencies from the [package.json](./package.json)
```bash
npm install
```

## Usage 
Enter schema and seed commands to create and seed a development database with test data.
and when you enter the command to invoke the application the server is started and the Sequelize models are synced to the MySQL database and you can test API POST, PUT, and DELETE routes in Insomnia to successfully create, update, and delete data in my database

### Create the development database
1. Go to the directory of schema.sql

2. Open a MySQL shell and enter this command
```
source schema.sql
```
### Seed the database with test data
3. Open a terminal and enter this command
```
npm run seed
```
### Invoke the application to start the server
4. In the terminal enter this command
```
npm run start
```
### Insomnia can be used to open the API GET POST, PUT, and DELETE routes
5. [Insomnia.rest](https://docs.insomnia.rest/)

## Demo
[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./assets/demo-video-screenshot.png)](https://user-images.githubusercontent.com/102924713/183825504-21e138a0-ba69-4317-9bcd-b6e22738b4e6.mp4)

## License 

### MIT License 
The content of this application is licensed under the MIT License. 

[https://choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/) 

## Contributing 
[Contributor Covenant](https://www.contributor-covenant.org/)

## Collaboration
Jerome Chenette

## Questions 

Contact me by [E-mail](mailto:portfoliolinkemail@gmail.com) or [GitHub](https://github.com/espinbrandon49)
