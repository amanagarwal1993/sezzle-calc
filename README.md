# Sezzle Calculator
This web application is a calculator that logs calculations as they happen and shares those calculations with everyone connected to the website.

1. When a user visits the app, the calculator is inactive. 
2. As soon as the client connects to the server, the calculator comes to life and alerts the user, and fetches the previous 10 most recent calculations performed on the server.
3. When a user requests a new expression to be evaluated, the client sends the expression to the server as a string and receives the result as a float. That result is also stored in a database and broadcasted to all other clients connected to the server at that time.
4. Upon disconnection, when the client reconnects, the results are refreshed with the latest results from server.

### Tech Stack
- Flask/Python 3.6
- SQLite database (for this project, Postgres etc was overkill)
- HTML, CSS and a custom-made light MVC framework using jQuery.