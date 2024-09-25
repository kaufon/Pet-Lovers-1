import { Entity } from "../abstracts"

type ProductProps = {
  price: number
  name:string
}
export class Product extends Entity{
  public price: number
  public name: string
  constructor(props:ProductProps){
    super()
    this.name = props.name
    this.price = props.price
  }
}
