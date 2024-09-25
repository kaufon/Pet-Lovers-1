import { Input } from "./Input";
import { Company } from "../core/domain/entities";
import { OutPut } from "./Output";
import {
  consumeProductUseCase,
  consumeServicesUseCase,
  deleteClientUseCase,
  deletePetUseCase,
  deleteProductUseCase,
  deleteServiceUseCase,
  editClientUseCase,
  editPetUseCase,
  editProductUseCase,
  editServiceUseCase,
  listByMostConsumedProductsOrServicecUseCase,
  listByMostConsumedProductsOrServicesQuantity,
  listByMostExpendedUseCase,
  listClientUseCase,
  listMostConsumedProductsAndServicesByPetRaceUseCase,
  listMostConsumedProductsAndServicesByPetTypeUseCase,
  listPetsUseCase,
  listProductsUseCase,
  listServiceUseCase,
  registerClientUseCase,
  registerPetsUseCase,
  registerProductUseCase,
  registerServiceUseCase,
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
        ["Produtos", "products"],
        ["Serviços", "services"],
        ["Listar", "list"],
        ["Sair", "leave"],
      ]);
      switch (option) {
        case "clients":
          await this.clientHandler();
          break;

        case "pets":
          await this.petHandler();
          break;
        case "services":
          await this.serviceHandler();
          break;
        case "products":
          await this.productHandler();
          break;
        case "list": {
          await this.listHandle();
          break;
        }

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
      ["Consumir produto", "consume-product"],
      ["Consumir serviço", "consume-service"],
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

      case "delete": {
        const useCase = new deleteClientUseCase(
          this.company.getClients,
          this.input,
        );
        return useCase.execute();
      }
      case "consume-service": {
        const useCase = new consumeServicesUseCase(
          this.company.getClients,
          this.input,
          this.company.getServices,
        );
        return useCase.execute();
      }
      case "consume-product": {
        const useCase = new consumeProductUseCase(
          this.company.getClients,
          this.company.getProducts,
          this.input,
        );
        return useCase.execute();
      }
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
      case "back":
        return;
      default: {
        console.log("Não entedi :(");
      }
    }
  }
  private async serviceHandler(): Promise<void> {
    let option = await this.input.selectInput("Por favor selecione :)", [
      ["Cadastrar serviço", "register"],
      ["Listar serviço", "list"],
      ["Editar serviço", "edit"],
      ["Deletar serviço", "delete"],
      ["Voltar", "back"],
    ]);
    switch (option) {
      case "register": {
        const useCase = new registerServiceUseCase(
          this.company.getServices,
          this.input,
        );
        return useCase.register();
      }
      case "list": {
        const useCase = new listServiceUseCase(
          this.company.getServices,
          this.output,
        );
        return useCase.list();
      }
      case "edit": {
        const useCase = new editServiceUseCase(
          this.company.getServices,
          this.input,
        );
        return useCase.execute();
      }
      case "delete": {
        const useCase = new deleteServiceUseCase(
          this.company.getServices,
          this.input,
        );
        return useCase.execute();
      }
      case "back": {
        return;
      }
      default: {
        console.log("Não entendi :(");
      }
    }
  }
  private async productHandler(): Promise<void> {
    let option = await this.input.selectInput("Por favor selecione :)", [
      ["Cadastrar produto", "register"],
      ["Listar produtos", "list"],
      ["Editar produto", "edit"],
      ["Deletar produto", "delete"],
      ["Voltar", "back"],
    ]);
    switch (option) {
      case "register": {
        const useCase = new registerProductUseCase(
          this.company.getProducts,
          this.input,
        );
        return useCase.register();
      }
      case "list": {
        const useCase = new listProductsUseCase(
          this.company.getProducts,
          this.output,
        );
        return useCase.list();
      }
      case "edit": {
        const useCase = new editProductUseCase(
          this.company.getProducts,
          this.input,
        );
        return useCase.execute();
      }
      case "delete": {
        const useCase = new deleteProductUseCase(
          this.company.getProducts,
          this.input,
        );
        return useCase.execute();
      }
      case "back": {
        return;
      }
    }
  }
  private async listHandle(): Promise<void> {
    let option = await this.input.selectInput("Por favor selecione :)", [
      [
        "Listar 10 clientes que mais consumiram em quantidade",
        "10-most-consumed",
      ],
      [
        "Listagem dos serviçoes e produts mais consumidos",
        "services-and-products-consumed",
      ],
      [
        "Listagem dos serviços e produtos mais consumidos por tipo de pet",
        "most-consumed-pet-type",
      ],
      [
        "Listagem dos serviços e produtos mais consumidos por raça de pet",
        "most-consumed-pet-race",
      ],
      ["Listagem dos 5 clientes que mais gastaram", "most-pay"],
      ["Voltar", "back"],
    ]);
    switch (option) {
      case "10-most-consumed": {
        const useCase = new listByMostConsumedProductsOrServicesQuantity(
          this.company.getClients,
          this.output,
          this.input,
        );
        return useCase.list();
      }
      case "services-and-products-consumed": {
        const useCase = new listByMostConsumedProductsOrServicecUseCase(
          this.company.getClients,
          this.output,
          this.input,
        );
        return useCase.list();
      }
      case "most-consumed-pet-type":{
        const useCase = new listMostConsumedProductsAndServicesByPetTypeUseCase(this.company.getClients,this.output,this.input)
        return useCase.list()
      }
      case "most-pay":{
        const useCase= new listByMostExpendedUseCase(this.company.getClients,this.input,this.output)
        return useCase.list()
      }
      case "most-consumed-pet-race": {
        const useCase = new listMostConsumedProductsAndServicesByPetRaceUseCase(
          this.company.getClients,
          this.output,
          this.input,
        );
        return useCase.list()
      }
      case "back":{
        return
      }
      default:{
        console.log("Não entendi :(")
      }
    }
  }
}
const app = new PetLoversSystem();
app.run();
