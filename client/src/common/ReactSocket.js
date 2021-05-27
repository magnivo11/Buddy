import io from "socket.io-client";
var socket = io.connect("http://localhost:8080");
export default socket;