import { Client, Pets } from "../../domain/entities";
import { IInput } from "../../interfaces";
import { Register } from "../register";

export class registerPetsUseCase extends Register {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
    super();
    this._clients = clients;
    this.input = input;
  }
  public async register(): Promise<void> {
    console.log("Cadastrando pet ....bop");

    const clientID = await this.input.textInput(
      "Por favor insira do ID do dono",
    );

    const client = this._clients.find((client) => client.getID === clientID);
    if (!client) {
      console.log("Cliente nao encontrado");
      return;
    }
    const petName = await this.input.textInput("Por favor insira o nome o pet");
    const petType = await this.input.selectInput(
      "Por favor insira o tipo do pet",
      [
        ["Cachorro", "dog"],
        ["Gato", "cat"],
        ["Réptil", "lizard"],
      ],
    );
    const petGender = await this.input.selectInput(
      "Por favor insira o genero",
      [
        ["Macho", "male"],
        ["Fêmea", "female"],
      ],
    );
    const petRace = await this.input.textInput(
      "Por favor insira a raça do pet",
    );
    const newPet = new Pets({
      _name: petName,
      _type: petType,
      _gender: petGender,
      _race: petRace,
    });

    client?.addPet(newPet);
  }
}
