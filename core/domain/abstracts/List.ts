import { IOutPut } from "../../interfaces";

export abstract class List{
  protected _output: IOutPut
  constructor(output:IOutPut){
    this._output = output
  }
  public abstract list():void
}
