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
    // acceder a notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requettes avec les méthodes GET, POST, PUT, DELETE, PATCH, OPTION
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.urlencoded({ extended: true }));

authRoutes(app)
userRoutes(app)
// app.use('auth', authRoutes)
// app.use('users', userRoutes)

// register routes
// app.get("/users", async function (req: Request, res: Response) {
//     const users = await myDataSource.getRepository(User).find()
//     res.json(users)
// })

// app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
// })

// app.post("/users", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).create(req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })

// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })

// app.delete("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).delete(req.params.id)
//     return res.send(results)
// })

// start express server
app.listen(3000, () => console.log('server started on http://localhost:3000'))