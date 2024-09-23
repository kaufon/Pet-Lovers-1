import { Entity } from "../abstracts/Entity";
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
  rgs?: Rg[];
  registerDate?: Date;
  cellphones?: Cellphone[];
  consumedProducts?: Product[];
  consumedServices?: Service[];
  pets?: Pets[];
};
export class Client extends Entity {
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
    super();
    this._cpf = props.cpf
    this.nome = props.nome
    this.nomeSocial = props.nomeSocial
    this._rgs = props.rgs ?? [];
    this._registerDate = props.registerDate ?? new Date();
    this._cellphones = props.cellphones ?? []
    this._consumedProducts = props.consumedProducts ?? []
    this._consumedServices = props.consumedServices ?? []
    this._pets = props.pets ?? []
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
  public set setCpf(newCpf: Cpf){
    this._cpf = newCpf
  }
}
