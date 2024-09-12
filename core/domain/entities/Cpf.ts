
type CpfProps = {
  value: string;
  emissionDate: Date;
};
export class Cpf  {
  private value: string
  private emissionDate:Date
  constructor(props:CpfProps){
    props.value = this.value
    props.emissionDate = this.emissionDate
  }
  public get getValue():string{
    return this.value
  }
  public get getEmissionDate():Date{
    return this.emissionDate
  }
}
