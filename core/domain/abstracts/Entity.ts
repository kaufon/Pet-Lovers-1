export class Entity{
  protected _id: string
  constructor( _id?:string){
    this._id = _id ?? crypto.randomUUID()
  }
  public get getID(): string{
    return this._id
  }
}
