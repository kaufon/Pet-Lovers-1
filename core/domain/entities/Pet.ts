import { Entity } from "../abstracts"

type PetsProps = {
  _name: string
  _type: string
  _race: string
  _gender: string
}
export class Pets extends Entity {
  private _name: string
  private _type: string
  private _race: string
  private _gender: string
  constructor(props:PetsProps){
    super()
    this._name = props._name
    this._type = props._type
    this._race = props._race
    this._gender = props._gender
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
