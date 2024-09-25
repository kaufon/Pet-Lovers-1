import { Input } from "./Input";
import { Company } from "../core/domain/entities";
import { OutPut } from "./Output";
import {
  deleteClientUseCase,
  deletePetUseCase,
  editClientUseCase,
  editPetUseCase,
  listClientUseCase,
  listPetsUseCase,
  registerClientUseCase,
  registerPetsUseCase,
} from "../core/use-cases";
export class PetLoversSystem {
  private company: Company;
  private input: Input;
  private output: OutPut;
  constructor() {
    this.company = new Company();
    this.input = new Input();
    this.output = new OutPut();
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
          await this.petHandler();
          break;
        case "leave":
          console.log("Obrigado por usar!");
          isRunning = false;
          break;
        default:
          console.log("Por favor repita não entendi :(");
          break;
      }
      this.output.lineBreaker();
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
        const useCase = new registerClientUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.register();
      }
      case "edit": {
        const useCase = new editClientUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.execute();
      }

      case "list": {
        const useCase = new listClientUseCase(
          this.company.getClients,
          this.output,
        );
        return useCase.list();
      }

      case "delete":
        const useCase = new deleteClientUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.execute();
      case "back":
        return;
      default:
        console.log("Nao entendi :(");
    }
  }
  private async petHandler(): Promise<void> {
    let option = await this.input.selectInput("Por favor selecione :)", [
      ["Cadastrar pet", "register"],
      ["Listar pet", "list"],
      ["Editar pet", "edit"],
      ["Deletar pet", "delete"],
      ["Voltar", "back"],
    ]);
    switch (option) {
      case "register": {
        const useCase = new registerPetsUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.register();
      }
      case "list": {
        const useCase = new listPetsUseCase(
          this.company.getClients,
          this.output,
        );
        return useCase.list();
      }
      case "edit": {
        const useCase = new editPetUseCase(this.company.getClients, this.input);
        return useCase.execute();
      }
      case "delete": {
        const useCase = new deletePetUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.execute();
      }
      default: {
        console.log("Não entedi :(");
      }
    }
  }
}
const app = new PetLoversSystem();
app.run();
