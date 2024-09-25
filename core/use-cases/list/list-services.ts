import { List } from "../../domain/abstracts";
import { Service } from "../../domain/entities";
import { IOutPut } from "../../interfaces";

export class listServiceUseCase extends List{
  private _services: Service[]
  constructor(services:Service[],output:IOutPut){
    super(output)
    this._services=services
  }
  public list(): void {
     if (this._services.length ===0) {
      console.log("Nenhum serviço cadastrado")
      return
      
     } 
    const servicesTable = this._services.map((service)=>({
      ID: service.getID,
      Nome: service.name,
      Preço: service.price
    }))
    this._output.table(servicesTable)
  }
}
