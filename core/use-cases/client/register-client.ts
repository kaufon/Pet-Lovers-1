import { Register } from "../../domain/abstracts";
import { Client, Cpf } from "../../domain/entities";
import { IInput } from "../../interfaces/Input";

export class registerClientUseCase extends Register {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[],input: IInput) {
    super();
    this._clients = clients;
    this.input = input;
  }
  public async register(): Promise<void> {
    console.log("Cadastrando client bip...bop");
    const name = await this.input.textInput(
      "Por favor insira nome do cliente ",
    );
    const socialName = await this.input.textInput(
      "Por favor insira nome social do client ",
    );
    const value = await this.input.textInput("Por favor insira cpf ");
    const dateInput = await this.input.textInput(
      "Por favor insira a data de emissao do cpf,no valor DD/MM/YYYY ",
    );
    const date = dateInput.split("/");
    const year = new Number(date[2].valueOf()).valueOf();
    const month = new Number(date[1].valueOf()).valueOf();
    const day = new Number(date[0].valueOf()).valueOf();
    const emissionDate = new Date(year, month, day);
    const cpf = new Cpf({ value: value, emissionDate: emissionDate });
    const newClient = new Client({
      nome: name,
      nomeSocial: socialName,
      cpf: cpf,
    });
    this._clients.push(newClient);
  }

}
