# Socket.io Demo

Simple demonstration of signal messaging back and forth between a server and connected web clients.

### Install

* clone the repo
* run `npm install` to install dependencies

### Run
* run `npm start` to start the server process
* open `http://localhost:5000` in a browser

### By directional communication
* upon successful connection the server sends a welcome message
* clicking the `ping` button will send a signal to the server
    * this event will be logged to the console
    * the server responds with a `pong` of acknowledgement

### Server side signaling

The process ID is printed to the terminal when the server process starts and is broadcast to each client upon (re)connection.  Simply open another console window and execute `kill -s SIGIO [ PROCESS ID ]` to send a signal to the server process.  This event will be broadcast to all connected clients.

For an added proof of concept, sending a regular kill signal to the server process (ie `kill [ PROCESS ID ]`) will notify all connected clients, who each log the event in the screen and then close their respective connections.  The server process will wait for each open connection to close before terminating.