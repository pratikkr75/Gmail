import express from "express" //to use this concept, include type: module in package.json file
import Connection from "./database/db.js";  // In backend writing .js extension is compulsory
import routes from "./routes/route.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/', routes);

const PORT = 8000;

Connection();

app.listen(PORT, () => console.log(`server running on port ${PORT}`));