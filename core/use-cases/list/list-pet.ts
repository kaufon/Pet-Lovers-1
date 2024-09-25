import { List } from "../../domain/abstracts";
import { Client  } from "../../domain/entities";
import { IOutPut } from "../../interfaces";

export class listPetsUseCase extends List {
  private _clients: Client[]
  constructor(clients: Client[], output: IOutPut) {
    super(output)
    this._clients = clients
  }
  public list(): void {
    if (this._clients.length === 0) {
      console.log("Nenhum cliente cadastrado")
      return

    }
    const petsWithOwners = this._clients.flatMap((client) => client.getPets.map((pet) => ({
      ownerID: client.getID,
      ownerName: client.nome,
      pet
    })))
    const petsTable = petsWithOwners.map((owner) => ({
      "ID do dono": owner.ownerID,
      "Nome do dono": owner.ownerName,
      ID: owner.pet.getID,
      Nome: owner.pet.getName,
      Raça: owner.pet.getRace,
      Tipo: owner.pet.getType,
      Genêro: owner.pet.getGender
    }))
    this._output.table(petsTable)
  }

}
