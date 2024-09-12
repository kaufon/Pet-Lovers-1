import { Cellphone } from "./Cellphone";
import { Cpf } from "./Cpf";
import { Pets } from "./Pet";
import { Product } from "./Product";
import { Rg } from "./Rg";
import { Service } from "./Service";

type ClientProps = {
  nome: string;
  nomeSocial: string;
  cpf: Cpf;
  rgs: Rg[];
  registerDate: Date;
  cellphones: Cellphone[];
  consumedProducts: Product[];
  consumedServices: Service[];
  pets: Pets[];
};
export class Client {
  public nome: string;
  public nomeSocial: string;
  private _cpf: Cpf;
  private _rgs: Rg[];
  private _registerDate: Date;
  private _cellphones: Cellphone[];
  private _consumedProducts: Product[];
  private _consumedServices: Service[];
  private _pets: Pets[];
  constructor(props: ClientProps) {
    props.cpf = this._cpf;
    props.nome = this.nome;
    props.nomeSocial = this.nomeSocial;
    props.rgs = this._rgs;
    props.registerDate = this._registerDate;
    props.cellphones = this._cellphones;
    props.consumedServices = this._consumedServices;
    props.consumedProducts = this._consumedProducts;
    props.pets = this._pets;
  }
  public get getCpf(): Cpf {
    return this._cpf;
  }
  public get getRgs(): Rg[] {
    return this._rgs;
  }
  public get getRegisterDate(): Date {
    return this._registerDate;
  }
  public get getCellphones(): Cellphone[] {
    return this._cellphones;
  }
  public get getConsumedProducts(): Product[] {
    return this._consumedProducts;
  }
  public get geConsumedServices(): Service[] {
    return this._consumedServices;
  }
  public get getPets(): Pets[] {
    return this._pets;
  }
}
