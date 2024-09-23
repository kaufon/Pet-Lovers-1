import PromptSync from "prompt-sync"
import inquirer from "inquirer"

export class Input{
  public textInput(message: string):string{
    const answer = inquirer.prompt({
      type: 'input',
      name: 'value',
      message: `${message}`

    })
    return answer.value
  }
  public numberInput(message:string):number{
    let prompt = PromptSync()
    let value = prompt(message)
    let number = new Number(value)
    return number.valueOf()
  }
}
