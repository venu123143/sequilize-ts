import { Router } from "express";
import accountRouter from "@/routes/UserRoutes";

class MainRouter {
    private router: Router;

    constructor() {
        this.router = Router(); // Initialize the Express router
        this.initializeRoutes(); // Set up the routes
    }

    // Method to set up the routes
    private initializeRoutes(): void {
        this.router.use("/user", accountRouter);
    }

    // Method to return the configured router
    public getRouter(): Router {
        return this.router;
    }
}

export default new MainRouter().getRouter();
