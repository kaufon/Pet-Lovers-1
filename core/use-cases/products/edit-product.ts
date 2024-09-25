import { Product } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class editProductUseCase{
  private _products: Product[]
  private input: IInput
  constructor(products: Product[],input:IInput){
    this.input = input
    this._products = products
  }
  public async execute():Promise<void>{
    if (this._products.length === 0) {
      console.log("Nenhum produto cadastrado")
      return
      
    }
    const productID = await this.input.textInput("Insira o id do produto a ser editado")
    const product = this._products.find((product) => product.getID === productID)
    if (!product) {
      console.log("Esse produto não existe")
      return
    }
    const newName= await this.input.textInput("Insira o novo nome do produto") || product.name
    const newPrice = await this.input.numberInput("Insira o novo preço do produto") || product.price

    product.name = newName
    product.price = newPrice
    console.log("Produto editado com sucesso")
  }
}
