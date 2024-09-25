import { Register } from "../../domain/abstracts";
import { Cellphone, Client, Cpf, Rg, Rg } from "../../domain/entities";
import { IInput } from "../../interfaces/Input";

export class registerClientUseCase extends Register {
  private _clients: Client[];
  private input: IInput;
  constructor(clients: Client[], input: IInput) {
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

    const emissionDate = this.parseDate(dateInput)
    const cpf = new Cpf({ value: value, emissionDate: emissionDate });

    const cellphoneQuantity = await this.input.numberInput(
      "Insira quantos telefones deseja colocar",
    );
    const cellphoneArray = new Array<Cellphone>();
    for (let index = 0; index < cellphoneQuantity; index++) {
      const phoneDDD = await this.input.textInput("Insira o DDD do telefone");
      const phoneNumber = await this.input.textInput(
        "Insira o numero do telefone",
      );

      const cellphone = new Cellphone({ number: phoneNumber, ddd: phoneDDD });
      cellphoneArray.push(cellphone);
    }

    const RgQuantity = await this.input.numberInput(
      "Insira a quantos rgs deseja colocar",
    );
    const RgArray = new Array<Rg>();
    for (let index = 0; index < RgQuantity; index++) {
      const RgValue = await this.input.textInput("Insira o valor do Rg")
      const dateInput = await this.input.textInput("Insira a data de emissao do rg")
      const emissionDate = this.parseDate(dateInput)
      const rg = new Rg({ value: RgValue, emissionDate: emissionDate })
      RgArray.push(rg)

    }

    const newClient = new Client({
      nome: name,
      nomeSocial: socialName,
      cpf: cpf,
      cellphones: cellphoneArray,
      rgs: RgArray
    });
    this._clients.push(newClient);
  }
  private parseDate(dateString: string): Date {
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }

}

