import { Entity } from "../abstracts"

type ServiceProps = {
  name: string
  price: number
}
export class Service extends Entity{
  public price: number
  public name:string
  constructor(props: ServiceProps){
    super()
    this.name = props.name
    this.price = props.price
  }
}
