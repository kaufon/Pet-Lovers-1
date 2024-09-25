import { List } from "../../domain/abstracts";
import { Product } from "../../domain/entities";
import { IOutPut } from "../../interfaces";

export class listProductsUseCase extends List {
  private _products: Product[];
  constructor(products: Product[], output: IOutPut) {
    super(output);
    this._products = products;
  }
  public list(): void {
    if (this._products.length ===0) {
      console.log("Nenhum produto cadastrado")
      return
      
    }

    const productsTable = this._products.map((product) =>({
      ID: product.getID,
      Nome: product.name,
      Preço: product.price
    }))
    this._output.table(productsTable)
  }
}
