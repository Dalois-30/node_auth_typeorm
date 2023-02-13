import * as express from "express"
import { myDataSource } from "./app-data-source"
import { authRoutes } from "./modules/auth/routes/auth.route";
import { userRoutes } from "./modules/auth/routes/user.route";


// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


// create and setup express app
const app = express()
app.use(express.json())

app.use(express.json());
app.use((req, res, next) => {
    // access app from all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // send requests with methods GET, POST, PUT, DELETE, PATCH, OPTION
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.urlencoded({ extended: true }));

// differents routes
authRoutes(app)
userRoutes(app)

// start express server
app.listen(3000, () => console.log('server started on http://localhost:3000'))