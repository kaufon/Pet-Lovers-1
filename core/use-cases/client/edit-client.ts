import { Cellphone, Client, Cpf, Rg } from "../../domain/entities";
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
    const clientToBeEdited = this._clients.find(
      (client) => client.getID === idToBeEdited,
    );
    if (!clientToBeEdited) {
      console.log("Esse cliente não existe");
      return;
    }
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
    let updatedCellphones = clientToBeEdited.getCellphones;
    const cellphoneArray = new Array<Cellphone>();
    for (let index = 0; index < updatedCellphones.length; index++) {
      const newPhoneDDD = await this.input.textInput(
        `Insira o novo ddd do ${index} telefone`,
      );
      const newPhoneNumber = await this.input.textInput(
        `Insira o novo numer do ${index} telefone`,
      );
      const cellphone = new Cellphone({
        number: newPhoneNumber,
        ddd: newPhoneDDD,
      });
      cellphoneArray.push(cellphone);
    }
    let updatedRgs = clientToBeEdited.getRgs;
    const RgArray = new Array<Rg>();
    for (let index = 0; index < updatedRgs.length; index++) {
      const newRgValue = await this.input.textInput(
        `Insira o novo valor do ${index} rg`,
      );
      const dateInput = await this.input.textInput(
        `Insira a nova data de emissao  do ${index} rg`,
      );
      const newEmissiondate = this.parseCpfDate(dateInput);
      const newRG = new Rg({
        emissionDate: newEmissiondate,
        value: newRgValue,
      });
      RgArray.push(newRG);
    }

    updatedRgs = RgArray;
    updatedCellphones = cellphoneArray;
    clientToBeEdited.nome = newName;
    clientToBeEdited.setRgs = updatedRgs;
    clientToBeEdited.setCellphones = updatedCellphones;
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
