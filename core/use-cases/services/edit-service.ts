import { PromptModule } from "inquirer";
import { Service } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class editServiceUseCase {
  private _services: Service[];
  private input: IInput;
  constructor(services: Service[], input: IInput) {
    this.input = input;
    this._services = services;
  }
  public async execute(): Promise<void> {
    const serviceID = await this.input.textInput(
      "Insira o ID do serviço a ser editado",
    );
    const service = this._services.find(
      (service) => service.getID === serviceID,
    );
    if (!service) {
      console.log("Esse serviço não existe");
      return;
    }
    const newName =
      (await this.input.textInput("Insira o novo nome")) || service.name;
    const newPrice =
      (await this.input.numberInput("Insira o novo preço")) || service.price;
    service.name = newName
    service.price = newPrice
  }
}
