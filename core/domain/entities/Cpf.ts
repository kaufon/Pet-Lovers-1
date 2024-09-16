
type CpfProps = {
  value: string;
  emissionDate: Date;
};
export class Cpf  {
  private value: string
  private emissionDate:Date
  constructor(props:CpfProps){
    this.value = props.value
    this.emissionDate = props.emissionDate
  }
  public get getValue():string{
    return this.value
  }
  public get getEmissionDate():Date{
    return this.emissionDate
  }
}
