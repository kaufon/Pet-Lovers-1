import { List } from "../../domain/abstracts";
import { Client } from "../../domain/entities";
import { IInput, IOutPut } from "../../interfaces";

export class listMostConsumedProductsAndServicesByPetRaceUseCase extends List {
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
    const consumptionByRace: {
      [key: string]: { [key: string]: { type: string; count: number } };
    } = {};

    this._clients.forEach((client) => {
      client.getPets.forEach((pet) => {
        const race = pet.getRace;
        if (!consumptionByRace[race]) {
          consumptionByRace[race] = {};
        }

        client.getConsumedProducts.forEach((product) => {
          if (!consumptionByRace[race][product.name]) {
            consumptionByRace[race][product.name] = {
              type: "Produto",
              count: 0,
            };
          }
          consumptionByRace[race][product.name].count++;
        });

        client.geConsumedServices.forEach((service) => {
          if (!consumptionByRace[race][service.name]) {
            consumptionByRace[race][service.name] = {
              type: "Serviço",
              count: 0,
            };
          }
          consumptionByRace[race][service.name].count++;
        });
      });
    });
    let consumptionTable: {
      Raça: string;
      Tipo: string;
      Nome: string;
      "Quantidade Consumida": number;
    }[] = [];
    for (const race in consumptionByRace) {
      for (const item in consumptionByRace[race]) {
        const { type, count } = consumptionByRace[race][item];
        if (count > 0) {
          consumptionTable.push({
            Raça: race,
            Tipo: type,
            Nome: item,
            "Quantidade Consumida": count,
          });
        }
      }
    }
    let sortedConsumptionTable = consumptionTable.sort((a, b) => {
      if (a.Raça === b.Raça) {
        return a["Quantidade Consumida"] - b["Quantidade Consumida"];
      }
      return a.Raça.localeCompare(b.Raça);
    });
    if (orderBy == "decrescent") {
      sortedConsumptionTable = sortedConsumptionTable.reverse();
    }
    this._output.table(sortedConsumptionTable);
  }
}
