import { Client } from "../../domain/entities"
import { IInput } from "../../interfaces"

export class deletePetUseCase {
  _clients: Client[]
  input: IInput
  constructor(client: Client[], input: IInput) {
    this._clients= client
    this.input = input
  }
  public async execute(): Promise<void> {
    console.log("Deletando pet....")
    const clientID = await this.input.textInput(
      "Por favor insira o id do client"
    )
    const client = this._clients.find((client) => client.getID === clientID)
    if (!client) {
      console.log("Cliente nao encontrado")
      return
      
    }
    const pets = client.getPets
    if (pets.length === 0) {
      console.log("O cliente não possui pets")
      return
      
    }
    const petID = await this.input.textInput("Por favor insira o ID do pet a ser removido")
    const petIndex = pets.findIndex((pet) => pet.getID === petID)
    if (petIndex === -1) {
      console.log("Pet não encontrado")
      return
      
    }
    pets.splice(petIndex, 1)
    console.log("Pet removido com sucesso")
  }
}
