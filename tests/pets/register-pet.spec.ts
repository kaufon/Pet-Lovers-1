import { Client, Cpf } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces";
import { registerPetsUseCase } from "../../core/use-cases";

describe("registerPetUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockClients: Client[];
  let client: Client;
  let systemUnderTest: registerPetsUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn().mockResolvedValueOnce(0),
      selectInput: jest
        .fn()
        .mockResolvedValueOnce("dog")
        .mockResolvedValueOnce("male"),
    };
    mockClients = [
      new Client({
        nome: "ola",
        nomeSocial: "12",
        cpf: new Cpf({ value: "12", emissionDate: new Date() }),
      }),
    ];
    client = mockClients[0];
    jest.spyOn(console, "log").mockImplementation(() => { });

    systemUnderTest = new registerPetsUseCase(mockClients, mockInput);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should register a pet", async () => {
    mockInput.textInput
      .mockResolvedValueOnce("0")
      .mockResolvedValueOnce("Cachorro")
      .mockResolvedValueOnce("husky"),
      await systemUnderTest.register();
    const pets = client.getPets;
    expect(pets[0].getName).toEqual("Cachorro");
    expect(pets[0].getRace).toEqual("husky");
    expect(pets[0].getType).toEqual("dog");
    expect(pets[0].getGender).toEqual("male");
  });
  it("should not register pet with 0 client", async () => {
    mockClients.splice(0, 1);
    await systemUnderTest.register();
    expect(console.log).toHaveBeenNthCalledWith(2, "Cliente nao encontrado");
  });
});
