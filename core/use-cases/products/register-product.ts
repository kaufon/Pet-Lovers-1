import { Register } from "../../domain/abstracts";
import { Product } from "../../domain/entities";
import { IInput } from "../../interfaces";

export class registerProductUseCase extends Register {
  private _products: Product[];
  private input: IInput;
  constructor(products: Product[], input: IInput) {
    super();
    this._products = products;
    this.input = input;
  }
  public async register(): Promise<void> {
  const productName = await this.input.textInput("Insira o nome do produto")
  const productPrice = await this.input.numberInput("Insira o preço do produto")
  const product = new Product({name:productName,price:productPrice})

  this._products.push(product)
  }
}
