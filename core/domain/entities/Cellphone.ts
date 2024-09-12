type CellPhoneProps = {
  ddd: string;
  number: string;
};
export  class Cellphone {
  private _ddd: string;
  private _number: string;
  constructor(props: CellPhoneProps) {
    props.ddd = this._ddd;
    props.number = this._number;
  }
  public get getDDD(): string {
    return this._ddd;
  }
  public get getNumber(): string {
  return this._number
  
  }
}
