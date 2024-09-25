import { Client, Service } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class consumeServicesUseCase {
  private _clients: Client[];
  private _input: IInput;
  private _services: Service[];
  constructor(clients: Client[], input: IInput, services: Service[]) {
    this._services = services;
    this._clients = clients;
    this._input = input;
  }
  public async execute(): Promise<void> {
    if (this._clients.length === 0 || this._services.length == 0) {
      console.log("Clients ou serviços vazios")
      return
      
    }
    const clientID = await this._input.textInput("Insira o id do cliente");
    const client = this._clients.find((client) => client.getID === clientID);
    if (!client) {
      console.log("Esse cliente não existe");
      return;
    }
    const serviceID = await this._input.textInput("Insira o id do serviço consumido")
    const service = this._services.find((service) => service.getID === serviceID) 
    if (!service) {
      console.log("Esse serviço não existe")
      return 
    }
    const quantity = await this._input.numberInput("Quantas vezes foi consumido?")
    for (let index = 0; index < quantity; index++) {
      client.geConsumedServices.push(service)
      
    }
  }
}
