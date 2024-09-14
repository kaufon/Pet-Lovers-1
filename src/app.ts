import { Input } from "../core/domain/abstracts/Input";
import { Client } from "../core/domain/entities/Client";
import { Company } from "../core/domain/entities/Company";
import { RegisterClientUseCase } from "../core/domain/use-cases/client";
import { LineBreaker } from "./lineBreaker";

console.log("Ola bem vindo ao Pet Lovers!");
let isRunning = true;
while (isRunning) {
  console.log("Opções: ");
  console.log(`1 - Cadastrar cliente`);
  console.log(`2 - Listar todos os clientes`);
  console.log(`0 - Sair`);

  let input = new Input();
  let option = input.numberInput("Por favor selecione: ");
  switch (option) {
    case 1:
      const useCase = new RegisterClientUseCase(Client["ola"]);
      useCase.register();
      break;
    case 2:
      console.log("listagem nao feito :(");
      break;
    case 0:
      console.log("Obrigado por usar!");

      isRunning = false;
      break;
    default:
      console.log("Por favor repita não entendi :(");
      break;
  }
  LineBreaker();
}
