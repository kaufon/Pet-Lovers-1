import { Client, Cpf } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces";
import { editClientUseCase } from "../../core/use-cases/client";

describe("editClientUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockClients: Client[];
  let systemUnderTest: editClientUseCase;

  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn().mockResolvedValueOnce(0),
      selectInput: jest.fn().mockResolvedValueOnce(0),
    };
    mockClients = [
      new Client({
        nome: "Joao",
        nomeSocial: "Joazinho",
        cpf: new Cpf({ value: "123", emissionDate: new Date() }),
      }),
    ];
    systemUnderTest = new editClientUseCase(mockClients, mockInput);
    jest.spyOn(console,"log").mockImplementation(() => {})
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Should edit client when provided valid id", async () => {
    mockInput.textInput
      .mockResolvedValueOnce("0")
      .mockResolvedValueOnce("Pedro")
      .mockResolvedValueOnce("Pedrinho")
      .mockResolvedValueOnce("123456789")
      .mockResolvedValueOnce("12/12/1212"),
      await systemUnderTest.execute();
    expect(mockClients[0].nome).toBe("Pedro");
    expect(mockClients[0].nomeSocial).toBe("Pedrinho");
    expect(mockClients[0].getCpf.getValue).toBe("123456789");
    expect(mockClients[0].getCpf.getEmissionDate).toEqual(
      new Date(1212, 11, 12),
    );
  });
  it("shoudl not edit client when provided unvalid id", async () => {
     mockInput.textInput.mockResolvedValueOnce("4632469832")
    await systemUnderTest.execute();
    expect(console.log).toHaveBeenCalledWith("Esse cliente não existe")

  });
});
