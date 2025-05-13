import express from "express"
// import asyncHandler from "express-async-handler";

class AccountRoutes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.registration();
    }

    private registration() {
        console.log("AccountRoutes: registration() called");

        // this.router.post("/register", asyncHandler(userController.register))
        // this.router.post("/login", asyncHandler(userController.login))

    }

}

export default new AccountRoutes().router;
