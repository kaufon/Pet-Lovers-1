import { List } from "../../domain/abstracts";
import { Client } from "../../domain/entities";
import { IInput, IOutPut } from "../../interfaces";

export class listByMostConsumedProductsOrServicecUseCase extends List {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], output: IOutPut, input: IInput) {
    super(output);
    this._clients = clients;
    this.input = input;
  }
  public async list(): Promise<void> {
    if (this._clients.length === 0) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const orderBy = await this.input.selectInput(
      "Qual maneira voce deseja ordernar",
      [
        ["Crescente", "crescent"],
        ["Decrescente", "decrescent"],
      ],
    );
    const consumption: { [key: string]: { type: string; count: number } } = {};
    this._clients.forEach((client) => {
      client.getConsumedProducts.forEach((product) => {
        consumption[product.name] = {
          type: "Produto",
          count: (consumption[product.name]?.count || 0) + 1,
        };
      });
      client.geConsumedServices.forEach((service) => {
        consumption[service.name] = {
          type: "Serviço",
          count: (consumption[service.name]?.count || 0) + 1,
        };
      });
    });
    const sortedConsumption = Object.entries(consumption).sort(
      (a, b) => a[1].count - b[1].count,
    );
    let consumptionTable = sortedConsumption.map(([name, { type, count }]) => ({
      Nome: name,
      Tipo: type,
      "Quantidade Consumida": count,
    }));
    if (orderBy == "decrescent") {
      consumptionTable = consumptionTable.reverse();
    }
    this._output.table(consumptionTable);
  }
}
