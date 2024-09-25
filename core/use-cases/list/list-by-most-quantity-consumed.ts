import { List } from "../../domain/abstracts";
import { Client } from "../../domain/entities";
import { IInput, IOutPut } from "../../interfaces";
import { listClientUseCase } from "./list-client";

export class listByMostConsumedProductsOrServicesQuantity extends List {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], output: IOutPut, input: IInput) {
    super(output);
    this.input = input;
    this._clients = clients;
  }
  public async list(): Promise<void> {
    if (this._clients.length === 0) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const orderBy= await this.input.selectInput("Deseja crescente ou decrescente", [
      ["Crescente", "crescent"],
      ["Descrescente", "decrescent"],
    ]);
    let sortedClients = [...this._clients].sort((a, b) => {
      const totalConsumptionA =
        a.getConsumedProducts.length + a.geConsumedServices.length;
      const totalConsumptionB =
        b.geConsumedServices.length + b.getConsumedProducts.length;
      return totalConsumptionB - totalConsumptionA;
    });
    if (orderBy == 'crescent') {
      sortedClients = sortedClients.reverse()
      
    }
    const sortedTable = new listClientUseCase(
      sortedClients,
      this._output,
    );
    sortedTable.list();
  }
}
