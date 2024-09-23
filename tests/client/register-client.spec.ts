import { Client } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces/Input";
import { registerClientUseCase } from "../../core/use-cases/client/register-client";

describe("registerClientUseCase", () => {
  let mockInput: IInput;
  let mockClients: Client[];
  let systemUnderTest: registerClientUseCase;

  beforeEach(() => {
    mockInput = {
      textInput: jest
        .fn()
        .mockResolvedValueOnce("john doe")
        .mockResolvedValueOnce("Johnny")
        .mockResolvedValueOnce("12345746906")
        .mockResolvedValueOnce("01/01/1000"),
      numberInput: jest.fn().mockResolvedValue(0),
      selectInput: jest.fn().mockResolvedValue(0),
    };
    mockClients = [];
    systemUnderTest = new registerClientUseCase(mockClients, mockInput);
  });
  it("Should create new client", async () => {
    await systemUnderTest.register();

    expect(mockClients.length).toBe(1);

    const newClient = mockClients[0];
    expect(newClient.nome).toBe("john doe");
    expect(newClient.nomeSocial).toBe("Johnny");
    expect(newClient.getCpf.getValue).toBe("12345746906");
    expect(newClient.getCpf.getEmissionDate).toEqual(new Date(1000,1,1));
  });
  it("Should only call input.textinput correct number of times",async ()=>{
    await systemUnderTest.register()
    expect(mockInput.textInput).toHaveBeenCalledTimes(4)

  })
});
