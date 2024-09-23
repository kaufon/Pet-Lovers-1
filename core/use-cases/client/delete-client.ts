import { Client } from "../../domain/entities";
import { IInput } from "../../interfaces/Input";

export class deleteClientUseCase  {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
    this._clients = clients;
    this.input = input;
  }
    public async execute(): Promise<void> {
    console.log("Removendo cliente.... não vá :(");
    const idToBeRemoved = await this.input.textInput(
      "Digite o id para ser removido",
    );
    const clientIndex = this._clients.findIndex((client)=> client.getID === idToBeRemoved)
    if (clientIndex === -1) {
      console.log("Esse ID não existe!")
      return
      
    }
    this._clients.splice(clientIndex, 1);
    console.log("Cliente removido :(");
  }
}
