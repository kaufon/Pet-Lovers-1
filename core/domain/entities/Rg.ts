type RgProps = {
  value: string;
  emissionDate: Date;
};
export class Rg  {
  private value: string
  private emissionDate:Date
  constructor(props:RgProps){
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
