

let currentID = 0
export class Entity{
  protected _id: string
  constructor( _id?:string){
    this._id = ( _id !== undefined ? _id: currentID++).toString()
  }
  public get getID(): string{
    return this._id
  }
}
