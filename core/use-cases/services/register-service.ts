import { Register } from "../../domain/abstracts";
import { Service } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class registerServiceUseCase extends Register {
  private _services: Service[]
  private input: IInput;
  constructor(services: Service[], input: IInput) {
    super();
    this.input = input;
    this._services = services;
  }
  public async register(): Promise<void> {

    const name = await this.input.textInput("Nome do serviço")
    const price = await this.input.numberInput("Preço do serviço em R$")
    const newService = new Service({name:name,price:price})
    this._services.push(newService)
    console.log("Produto cadastrado com sucesso!")
  }
}
