import { Router } from "express";
import { productController } from "../controller/product.controller";

export class ProductRouter {
  private router: Router;
  private controller: productController;

  constructor() {
    this.router = Router();
    this.controller = new productController();
    this.initiateRoutes();
  }

  private initiateRoutes(): void {
    this.router.get('/ping', this.handle(this.controller.ping));
  }

  public accessProductRoutes(): Router {
    return this.router;
  }

  // Utility to bind the controller method while maintaining the correct signature
  private handle(method: Function) {
    return method.bind(this.controller);
  }
}
