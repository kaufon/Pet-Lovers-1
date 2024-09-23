import { Input } from "../../../../src/Input";
import { Client } from "../../entities/Client";
import { Cpf } from "../../entities/Cpf";
import { Register } from "../register";

export class RegisterClientUseCase extends Register {
  private _clients: Client[];
  private input: Input;
  constructor(clients: Client[],input: Input) {
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
