import { List } from "../../domain/abstracts";
import { Client } from "../../domain/entities";
import { IInput, IOutPut } from "../../interfaces";

export class listByMostExpendedUseCase extends List {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput, output: IOutPut) {
    super(output);
    this._clients = clients;
    this.input = input;
  }
  public async list(): Promise<void> {
    if (this._clients.length === 0) {
      console.log("Nenhum cliente cadastrado");
      return;
    }
    const orderBy = await this.input.selectInput("Desejar ordernar como?", [
      ["Crescente", "crescent"],
      ["Decrescente", "decrescent"],
    ]);
    const clientSpending: { Cliente: string; TotalGasto: number }[] =
      this._clients.map((client) => {
        const totalProductSpending = client.getConsumedProducts
          .map((product) => product.price)
          .reduce((total, price) => total + price, 0);
        const totalServiceSpeding = client.geConsumedServices
          .map((service) => service.price)
          .reduce((total, price) => total + price, 0);

        const totalSpent = totalProductSpending + totalServiceSpeding;

        return {
          Cliente: client.nome,
          TotalGasto: totalSpent,
        };
      });
    let topClients = clientSpending
      .sort((a, b) => b.TotalGasto - a.TotalGasto)
      .slice(0, 5);
    if (orderBy === "decrescent") {
      topClients = topClients.reverse();
    }
    this._output.table(topClients);
  }
}
