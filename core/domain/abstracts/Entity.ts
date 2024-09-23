export class Entity<T>{
  protected _id?: string
  public props:T
  constructor(props:T , _id?:string){
    this._id = _id ?? crypto.randomUUID()
    this.props = props
  }
}
