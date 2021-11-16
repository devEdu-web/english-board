import server from "./src/app.js";
import dotenv from "dotenv";
import { connectingToDatabase } from "./src/config/database.js";
dotenv.config();

const port = process.env.PORT;

await connectingToDatabase();

server.app.listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`Conected on port: ${port}`);
    }
});
