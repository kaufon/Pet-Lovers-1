type PetsProps = {
  _name: string
  _type: string
  _race: string
  _gender: string
}
export class Pets {
  private _name: string
  private _type: string
  private _race: string
  private _gender: string
  constructor(props:PetsProps){
    props._type = this._type
    props._gender = this._gender
    props._race = this._race
    props._name = this._name
  }
  public get getName():string{
    return this._name

  }
  public get getRace():string{
    return this._race
  }
  public get getGender():string{
    return this._gender
  }
  public get getType():string{
    return this._type
  }
}
