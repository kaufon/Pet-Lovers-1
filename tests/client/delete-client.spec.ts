import { Client, Cpf } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces/Input";
import { deleteClientUseCase } from "../../core/use-cases";
describe("deleteClientUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockClients: Client[];
  let systemUnderTest: deleteClientUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn().mockResolvedValueOnce(0),
      selectInput: jest.fn().mockResolvedValueOnce(0),
    };
    mockClients = [
      new Client({
        nome: "John Doe",
        nomeSocial: "Johnny",
        cpf: new Cpf({ value: "12345678900", emissionDate: new Date() }),
      }),
    ];
    systemUnderTest = new deleteClientUseCase(mockClients, mockInput);
    jest.spyOn(console, "log").mockImplementation(() => { });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks;
  });
  it("Should remove a client when provided valid id", async () => {
    mockInput.textInput.mockResolvedValue("0"); // Simulate entering a valid ID
    expect(mockClients.length).toBe(1);
    await systemUnderTest.execute();
    expect(mockClients.length).toBe(0);
  });
  it("Shoud not remove a client because id is unvalid", async () => {
    mockInput.textInput.mockResolvedValueOnce("67894638729");
    expect(mockClients.length).toBe(1);
    await systemUnderTest.execute();
    expect(mockClients.length).toBe(1);
    expect(console.log).toHaveBeenCalledWith("Esse ID não existe!");
  });
});
