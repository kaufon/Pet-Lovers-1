import { Entity } from "../abstract"

type ClientProps = {
  nome:string
  nomeSocial:string
  cpf:string
  rg:string
}
export class Client extends Entity<ClientProps> {
  public get getCpf(){
    return this.props.cpf
  }
  public get getRgs(){
    return Array<string>
  }




}
