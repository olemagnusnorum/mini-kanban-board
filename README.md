# mini-kanban-board
A mini kanban board made with ASP.NET and React

The backend server is made with ASP.NET and exposes a REST API to GET and PUT data to a sqlite database. The frontend server is run with node.js and React is used to formate the website and comunicate with the backend server.

## The Backend Server
The backend server is hosted on http://localhost:5000.

The REST API is avalible on the following routes.

GET:
api/projects
api/projects/{id}

POST:
api/projects

PUT:
api/projects/{id}

DELETE:
api/projects/{id}

## The Frontend Server
The frontend server is hosted on http://localhost:3000.

## Starting the Servers

### Backend

To start the backend navigate to:
```
$ cd Projectboard/ProjectBoard
```
and run:
```
$ dotnet run
```
if the database needs to be created do:
```
$ dotnet ef migrations add InitialCreate
$ dotnet ef database update
```

### Frontend

To start the frontend navigate to:
```
$ cd ProjectBoard/projectboard-frontend
```
and run:
```
$ npm start
```
