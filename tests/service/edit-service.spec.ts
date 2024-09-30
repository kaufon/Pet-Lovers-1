import { Service } from "../../core/domain/entities/Service";
import { IInput } from "../../core/interfaces/Input";
import { editServiceUseCase } from "../../core/use-cases/services/edit-service";

describe("editserviceusecase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockServices: Service[];
  let systemUnderTest: editServiceUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    };
    mockServices = [new Service({ name: "Carro", price: 12 })];
    systemUnderTest = new editServiceUseCase(mockServices, mockInput);
    jest.spyOn(console,"log").mockImplementation(() =>{})
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should edit product", async () =>{
    mockInput.textInput.mockResolvedValueOnce(mockServices[0].getID)
    mockInput.textInput.mockResolvedValueOnce("Moto")
    mockInput.numberInput.mockResolvedValueOnce(1200)
    await systemUnderTest.execute()
    const editedService = mockServices[0]
    expect(editedService.name).toBe("Moto")
    expect(editedService.price).toEqual(1200)
  })
  it("should not edit",async () => {
    mockInput.textInput.mockResolvedValueOnce('1312312')
    await systemUnderTest.execute()
    expect(console.log).toHaveBeenNthCalledWith(1,"Esse serviço não existe") 
  })
});
