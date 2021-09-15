import express from "express";
import http from "http";
import * as socket from "socket.io";
import dotenv from "dotenv";
// import cors from "cors";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new socket.Server(server, {
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(routes)


io.on("connection", (socket) => {
  console.log("server connected");
  
  socket.on("disconnect", (soc) => {
    console.log("client disconnected");
  });
});


export { io };
server.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
