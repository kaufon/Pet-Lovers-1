import { Client, Cpf } from "../../domain/entities";
import { IInput } from "../../interfaces/Input";

export class editClientUseCase {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
    this.input = input;
    this._clients = clients;
  }
  public async execute(): Promise<void> {
    const idToBeEdited = await this.input.textInput(
      "Qual id do cliente que você quer editar?",
    );
    const clientIndex = this._clients.findIndex(
      (client) => client.getID === idToBeEdited,
    );
    if (clientIndex === -1) {
      console.log("Esse cliente não existe");
      return;
    }
    const clientToBeEdited: Client = this._clients[clientIndex];
    const newName =
      (await this.input.textInput("Por favor insira o novo nome")) ||
      clientToBeEdited.nome;
    const newSocialName =
      (await this.input.textInput("Por favor insira o novo nome social")) ||
      clientToBeEdited.nomeSocial;
    const newCpfValue =
      (await this.input.textInput("Por favor insira o novo valor do cpf")) ||
      clientToBeEdited.getCpf.getValue;
    const newCpfDateInput = await this.input.textInput(
      "Por favor insira a nova data de emissão",
    );
    const newEmissionDate = newCpfDateInput
      ? this.parseCpfDate(newCpfDateInput)
      : clientToBeEdited.getCpf.getEmissionDate;
    const updatedCpf = newCpfValue
      ? new Cpf({ value: newCpfValue, emissionDate: newEmissionDate })
      : clientToBeEdited.getCpf;

    clientToBeEdited.nome = newName;
    clientToBeEdited.nomeSocial = newSocialName;
    clientToBeEdited.setCpf = updatedCpf;
    console.log("Cliente atualizado com sucesso");
  }
  private parseCpfDate(dateString: string): Date {
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }
}
