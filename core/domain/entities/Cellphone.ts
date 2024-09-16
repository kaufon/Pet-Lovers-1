type CellPhoneProps = {
  ddd: string;
  number: string;
};
export  class Cellphone {
  private _ddd: string;
  private _number: string;
  constructor(props: CellPhoneProps) {
    this._ddd = props.ddd
    this._number = props.ddd
  }
  public get getDDD(): string {
    return this._ddd;
  }
  public get getNumber(): string {
  return this._number
  
  }
}
