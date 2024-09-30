import { Client, Cpf, Pets } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces";
import { editPetUseCase } from "../../core/use-cases/pets/edit-pet";

describe("editPetUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockClients: Client[];
  let systemUnderTest: editPetUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn().mockResolvedValueOnce(0),
      selectInput: jest
        .fn()
        .mockResolvedValueOnce("cat")
        .mockResolvedValueOnce("male"),
    };
    const mockPets: Pets[] = [
      new Pets({
        _name: "fnj",
        _race: "ndkjsa",
        _type: "dsa",
        _gender: "dsa",
      }),
    ];
    mockClients = [
      new Client({
        nomeSocial: "dsas",
        nome: "dsa",
        cpf: new Cpf({ value: "12", emissionDate: new Date() }),
        pets: mockPets,
      }),
    ];
    systemUnderTest = new editPetUseCase(mockClients, mockInput);
    jest.spyOn(console,"log").mockImplementation(() => {})
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should edit pet", async () => {
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getID);
    let pet = mockClients[0].getPets[0]
    mockInput.textInput.mockResolvedValueOnce(pet.getID);
    mockInput.textInput.mockResolvedValueOnce("Gatinho");
    mockInput.textInput.mockResolvedValueOnce("Laranja");
    await systemUnderTest.execute()
    expect(pet.getName).toEqual("Gatinho")
    expect(pet.getRace).toEqual("Laranja")
    expect(pet.getType).toEqual('cat')
    expect(pet.getGender).toEqual('male')
  });
  it("shoud not edit pet because of incorrect owner id",async () =>{
    mockInput.textInput.mockResolvedValueOnce("1236897263712")
    await systemUnderTest.execute()
    expect(console.log).toHaveBeenNthCalledWith(1,"Esse cliente não existe")
  })
  it("should not edit pet because of incorrect pet id",async () =>{
    mockInput.textInput.mockResolvedValueOnce(mockClients[0].getID)
    mockInput.textInput.mockResolvedValueOnce("34721983721")
    await systemUnderTest.execute()
    expect(console.log).toHaveBeenNthCalledWith(1,"Esse pet não existe")
  })
});
