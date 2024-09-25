import { Client } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class editPetUseCase {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
    this._clients = clients;
    this.input = input;
  }
  public async execute(): Promise<void> {
    const clientID = await this.input.textInput("Insira o ID do cliente");
    const client = this._clients.find((client) => client.getID === clientID);
    if (!client) {
      console.log("Esse cliente não existe");

      return;
    }
    const pets = client.getPets;
    if (pets.length === 0) {
      console.log("Esse cliente não possui pets");
      return;
    }
    const petID = await this.input.textInput(
      "Insira o ID do pet a ser editado",
    );
    const petToBeEdited = pets.find((pet) => pet.getID === petID);
    if (!petToBeEdited) {
      console.log("Esse pet não existe");
      return;
    }
    const newName =
      (await this.input.textInput("Insira o novo nome do pet")) ||
      petToBeEdited.getName;
    const newType = await this.input.selectInput("Insira o tipo do pet", [
      ["Cachorro", "dog"],
      ["Gato", "cat"],
      ["Réptil", "lizard"],
    ]);
    const newGender = await this.input.selectInput("Insira o novo genero", [
      ["Macho", "male"],
      ["Fêmea", "female"],
    ]);

    const newRace =
      (await this.input.textInput("Insira a nova raça do pet")) ||
      petToBeEdited.getRace;
    petToBeEdited.setName = newName;
    petToBeEdited.setRace = newRace;
    petToBeEdited.setType = newType;
    petToBeEdited.setGender = newGender;
    console.log("Pet editado com sucesso");
  }
}
