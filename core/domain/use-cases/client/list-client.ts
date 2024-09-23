import { List } from "../../abstracts/List";
import { Client } from "../../entities/Client";

export class ListClientUseCase extends List {
  private _clients: Client[];
  constructor(clients: Client[]) {
    super();
    this._clients = clients;
  }
  public list(): void {
    if (this._clients.length <= 0) {
      console.log("Nenhum cliente cadastrado :(");
      return;
    }
    this._clients.forEach((client) => {
      console.log(`ID: ${client.getID}`);
      console.log(`Nome: ${client.nome}`);
      console.log(`NomeScoial: ${client.nomeSocial}`);
      console.log(`CPF: ${client.getCpf.getValue}`);
    });
  }
}
