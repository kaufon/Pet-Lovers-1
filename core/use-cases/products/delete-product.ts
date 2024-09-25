import { Product } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class deleteProductUseCase{
  private _products: Product[]
  private _input: IInput
  constructor(products: Product[],input: IInput){
    this._products = products
    this._input = input
  }
  public async execute():Promise<void>{
    if (this._products.length ===0) {
      console.log("Nenhum produto registrado")
      return
      
    }
    const productID = await this._input.textInput("Insira o id do produto a ser removido")

    const productIndex = this._products.findIndex((product) => product.getID === productID)
    if (productIndex === -1) {
      console.log("Esse produto não existe")
      return
      
    }

    this._products.splice(productIndex,1)
    console.log("Produto removido com sucesso")
  }
}
