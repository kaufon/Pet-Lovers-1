import {Table} from "console-table-printer"
import { IOutPut } from "../core/domain/interfaces/Output";
export class OutPut implements IOutPut {
  public lineBreaker(): void {
    return console.log(
      "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=",
    );
  }
  public table(data: Array<Record<string,any>>):void{
    const table = new Table()
    data.forEach(row => table.addRow(row))
    table.printTable()
  }
}
