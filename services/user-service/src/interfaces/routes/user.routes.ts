import { Router } from "express";
import { userController } from "../controllers/user.controller";

export class UserRouter {
  private router: Router;
  private controller: userController;

  constructor() {
    this.router = Router();
    this.controller = new userController();
    this.initiateRoutes();
  }

  private initiateRoutes(): void {
    this.router.get('/ping-test', this.handle(this.controller.pingUser));
    this.router.get('/ping-product',this.handle(this.controller.pingProduct))
    this.router.post('/add-product',this.handle(this.controller.addProduct))
  }

  public accessUserRoutes(): Router {
    return this.router;
  }

  // Utility to bind the controller method while maintaining the correct signature
  private handle(method: Function) {
    return method.bind(this.controller);
  }
}
