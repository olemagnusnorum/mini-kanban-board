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
