import { Service } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class deleteServiceUseCase{
  private _services: Service[]
  private input: IInput
  constructor(services: Service[],input:IInput){
    this.input = input
    this._services = services
  }
  public async execute():Promise<void>{
    const serviceID = await this.input.textInput("ID do serviço a ser removido")
    const serviceIndex = this._services.findIndex((service) => service.getID === serviceID)
    if (serviceIndex === -1) {
      console.log("Esse serviço não existe")
      return
      
    }
    this._services.splice(serviceIndex,1)
    console.log("Serviço removido com sucesso")
  }

}
