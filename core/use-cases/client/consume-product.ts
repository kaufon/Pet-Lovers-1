import { Client, Product } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class consumeProductUseCase{
  private _clients: Client[]
  private _products: Product[]
  private input: IInput
  constructor(clients: Client[],products: Product[],input: IInput){
    this._products = products,
    this._clients = clients,
    this.input = input
  }
  public async execute():Promise<void>{
    if (this._clients.length === 0 || this._products.length === 0) {
      console.log("Clientes ou produtos vazios")
      return
      
    }
    const clientID = await this.input.textInput("Insira o id do cliente")
    const client = this._clients.find((client) => client.getID === clientID)
    if (!client) {
      console.log("Esse cliente não existe")
      return
      
    }
    const productID = await this.input.textInput("Insira do id do produto consumido")
    const product = this._products.find((product) => product.getID === productID)
    if (!product) {
      console.log("Esse produto não existe")
      return
      
    }
    const quantity = await this.input.numberInput("Quantas vezes foi consumido?")
    for (let index = 0; index < quantity; index++) {
      client.getConsumedProducts.push(product)
      
    }
  }
}
