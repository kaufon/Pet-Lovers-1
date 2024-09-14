import PromptSync from "prompt-sync"

export class Input{
  public textInput(message: string):string{
    let prompt = PromptSync()
    let value = prompt(message)
    return value
  }
  public numberInput(message:string):number{
    let prompt = PromptSync()
    let value = prompt(message)
    let number = new Number(value)
    return number.valueOf()
  }
}
