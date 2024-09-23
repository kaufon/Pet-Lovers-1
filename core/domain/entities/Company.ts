import { Client } from "./Client";
import { Product } from "./Product";
import { Service } from "./Service";

type CompanyProps = {
  _clients: Client[];
  _products: Product[];
  _services: Service[];
};
export class Company {
  private _clients: Client[];
  private _products: Product[];
  private _services: Service[];
  constructor(){
    this._services = []
    this._products = []
    this._clients = []
  }
  public get getClients(): Client[]{
    return this._clients
  }
  public get getServices(): Service[]{
    return this._services
  }
  public get getProducts(): Product[]{
    return this._products
  }
}
