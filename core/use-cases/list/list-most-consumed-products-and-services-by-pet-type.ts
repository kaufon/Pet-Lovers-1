import { List } from "../../domain/abstracts";
import { Client } from "../../domain/entities";
import { IInput, IOutPut } from "../../interfaces";

export class listMostConsumedProductsAndServicesByPetTypeUseCase extends List {
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
    const consumptionByType: {
      [key: string]: { [key: string]: { productType: string; count: number } };
    } = {};

    this._clients.forEach((client) => {
      client.getPets.forEach((pet) => {
        const type = pet.getType;
        if (!consumptionByType[type]) {
          consumptionByType[type] = {};
        }

        client.getConsumedProducts.forEach((product) => {
          if (!consumptionByType[type][product.name]) {
            consumptionByType[type][product.name] = {
              productType: "Produto",
              count: 0,
            };
          }
          consumptionByType[type][product.name].count++;
        });

        client.geConsumedServices.forEach((service) => {
          if (!consumptionByType[type][service.name]) {
            consumptionByType[type][service.name] = {
              productType: "Serviço",
              count: 0,
            };
          }
          consumptionByType[type][service.name].count++;
        });
      });
    });
    let consumptionTable: {
      "Tipo do pet": string;
      Tipo: string;
      Nome: string;
      "Quantidade Consumida": number;
    }[] = [];
    for (const type in consumptionByType) {
      for (const item in consumptionByType[type]) {
        const { productType, count } = consumptionByType[type][item];
        if (count > 0) {
          consumptionTable.push({
            "Tipo do pet": type,
            Tipo: productType,
            Nome: item,
            "Quantidade Consumida": count,
          });
        }
      }
    }
    let sortedConsumptionTable = consumptionTable.sort((a, b) => {
      if (a["Tipo do pet"] === b["Tipo do pet"]) {
        return a["Quantidade Consumida"] - b["Quantidade Consumida"];
      }
      return a["Tipo do pet"].localeCompare(b["Tipo do pet"]);
    });
    if (orderBy == "decrescent") {
      sortedConsumptionTable = sortedConsumptionTable.reverse();
    }
    this._output.table(sortedConsumptionTable);
  }
}
