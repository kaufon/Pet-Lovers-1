import { RegisterClientUseCase } from "../core/domain/use-cases/client/register-client";
import { Input } from "./Input";
import { Company } from "../core/domain/entities";
import { LineBreaker } from "./lineBreaker";
import { ListClientUseCase } from "../core/domain/use-cases/list/list-client";
export class PetLoversSystem {
  private company: Company;
  private input: Input;
  constructor() {
    this.company = new Company();
    this.input = new Input();
  }
  public async run(): Promise<void> {
    console.log("Ola bem vindo ao Pet Lovers!");
    let isRunning = true;
    while (isRunning) {
      let option = await this.input.selectInput("Por favor selecione :)", [
        ["Clientes", "clients"],
        ["Pets", "pets"],
        ["Sair", "leave"],
      ]);
      switch (option) {
        case "clients":
          await this.clientHandler();
          break;

        case "pets":
          console.log("Oops nao exite :(");
          break;
        case "leave":
          console.log("Obrigado por usar!");
          isRunning = false;
          break;
        default:
          console.log("Por favor repita não entendi :(");
          break;
      }
      LineBreaker();
    }
  }
  private async clientHandler(): Promise<void> {
    let option = await this.input.selectInput("Por favor selecione :)", [
      ["Cadastrar clientes", "register"],
      ["Listar clientes", "list"],
      ["Editar clientes", "edit"],
      ["Deletar clientes", "delete"],
      ["Voltar", "back"],
    ]);
    switch (option) {
      case "register": {
        const useCase = new RegisterClientUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.register();
      }

      case "list": {
        const useCase = new ListClientUseCase(this.company.getClients);
        return useCase.list();
      }
      case "back":
        return;
      default:
        console.log("Nao entendi :(");
    }
  }
}
const app = new PetLoversSystem()
app.run()
