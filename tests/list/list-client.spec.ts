import { Client, Cpf } from "../../core/domain/entities";
import { IOutPut } from "../../core/interfaces";
import { listClientUseCase } from "../../core/use-cases";
import { OutPut } from "../../src/Output";

describe("listClientUseCase", () => {
  let mockOutput: IOutPut;
  let mockClients: Client[];
  let systemUnderTest: listClientUseCase;
  beforeEach(() => {
    mockOutput = new OutPut();
    mockClients = [
      new Client({
        nome: "Joao",
        nomeSocial: "Johny",
        cpf: new Cpf({ value: "123", emissionDate: new Date() }),
      }),
    ];
    systemUnderTest = new listClientUseCase(mockClients, mockOutput);
  });
  it("Should print a table ",()=>{
    const tableSpy = jest.spyOn(mockOutput,"table")
    systemUnderTest.list()
    const expectedDate = mockClients[0].getCpf.getEmissionDate.toLocaleDateString("en-US")
    expect(tableSpy).toHaveBeenCalled()
    expect(tableSpy).toHaveBeenCalledWith([{
      ID: mockClients[0].getID,
      Nome: "Joao",
      "Nome Social": "Johny",
      CPF: "123",
      RGs: "",
      Celulares:  [],
      "Produtos Consumidos": "",
      "Serviços Consumidos": "",
      Pets: "",
      "Data Registro": expectedDate
    }])
  })
  it("Should NOT print a table",()=>{
    mockClients = []
    systemUnderTest = new listClientUseCase(mockClients,mockOutput)
    const consoleSpy = jest.spyOn(console,"log")
    systemUnderTest.list()
    expect(consoleSpy).toHaveBeenCalledWith("Nenhum cliente cadastrado :(")
  })
});
