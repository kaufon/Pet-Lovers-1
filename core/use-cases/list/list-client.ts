
import {List} from "../../domain/abstracts"
import { Client } from "../../domain/entities";
import { IOutPut } from "../../interfaces";

export class listClientUseCase extends List {
  private _clients: Client[];
  constructor(clients: Client[], output: IOutPut) {
    super(output);
    this._clients = clients;
  }
  public list(): void {
    if (this._clients.length <= 0) {
      console.log("Nenhum cliente cadastrado :(");
      return;
    }
    const clientsTable = this._clients.map((client) => ({
      ID: client.getID,
      Nome: client.nome,
      "Nome Social": client.nomeSocial,
      CPF: client.getCpf.getValue,
      RGs: client.getRgs.map((rg) => rg.getValue).join(", "), // Joining RG numbers
      Celulares: client.getCellphones
        .map((cell) => cell.getNumber)
        .join(", "), // Joining cell numbers
      "Produtos Consumidos": client.getConsumedProducts
        .map((product) => product.name)
        .join(", "),
      "Serviços Consumidos": client.geConsumedServices
        .map((service) => service.name)
        .join(", "),
      Pets: client.getPets.map((pet) => pet.getName).join(", "),
      "Data Registro": client.getRegisterDate.toLocaleDateString(),
    }));

    this._output.table(clientsTable);
  }
}
