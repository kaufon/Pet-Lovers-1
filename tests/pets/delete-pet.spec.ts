import { Client, Cpf, Pets } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces";
import { deletePetUseCase } from "../../core/use-cases";

describe("deletePetUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockClients: Client[];
  let systemUnderTest: deletePetUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn().mockResolvedValueOnce(0),
      selectInput: jest.fn().mockResolvedValueOnce(0),
    };
    const mockPets: Pets[] = [
      new Pets({
        _name: "pedro",
        _race: "dnsajdsa",
        _type: "dasdsa",
        _gender: "dasdsa",
      }),
    ];
    mockClients = [
      new Client({
        nome: "John Doe",
        nomeSocial: "Johnny",
        cpf: new Cpf({ value: "12345678900", emissionDate: new Date() }),
        pets: mockPets,
      }),
    ];
    systemUnderTest = new deletePetUseCase(mockClients, mockInput);
    jest.spyOn(console, "log").mockImplementation(() => { });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks;
  });
  it("should remove a pet", async () => {
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getID);
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getPets[0].getID);
    expect(mockClients[0].getPets.length).toEqual(1);
    await systemUnderTest.execute();
    expect(mockClients[0].getPets.length).toEqual(0);
  });
  it("should not remove a pet because of uncorrect owner id", async () => {
    mockInput.textInput.mockResolvedValueOnce("12343");
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getPets[0].getID);
    await systemUnderTest.execute();
    expect(console.log).toHaveBeenNthCalledWith(2, "Cliente nao encontrado");
  });
  it("should not remove a pet because of uncorrect pet id", async () => {
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getID);
    mockInput.textInput.mockResolvedValueOnce("12312321312321");
    await systemUnderTest.execute();
    expect(console.log).toHaveBeenNthCalledWith(2, "Pet não encontrado");
  });
});
