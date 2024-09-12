import { Entity } from "../abstract";

type RgProps = {
  value: string;
  emissionDate: Date;
};
export class Rg extends Entity<RgProps> {
  private _value:string
  private _emissionDate:Date
  private constructor(props: RgProps, _id?: string) {
    super(props, _id);
    this._value = props.value
    this._emissionDate = props.emissionDate
  }
  public get getValue():string{
    return this._value
  }
  public get getEmissionDate():Date{
    return this._emissionDate
  }
}
