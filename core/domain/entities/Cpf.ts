import { Entity } from "../abstract";

type CpfProps = {
  value: string;
  emissionDate: Date;
};
export class Cpf extends Entity<CpfProps> {
  private _value:string
  private _emissionDate:Date
  private constructor(props: CpfProps, _id?: string) {
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

