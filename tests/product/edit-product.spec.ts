
import { Product } from "../../core/domain/entities";
import { IInput } from "../../core/interfaces/Input";
import { editProductUseCase } from "../../core/use-cases";

describe("editproductusecase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockproducts: Product[]
  let systemUnderTest: editProductUseCase;
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    };
    mockproducts = [new Product({ name: "Carro", price: 12 })];
    systemUnderTest = new editProductUseCase(mockproducts, mockInput);
    jest.spyOn(console,"log").mockImplementation(() =>{})
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should edit product", async () =>{
    mockInput.textInput.mockResolvedValueOnce(mockproducts[0].getID)
    mockInput.textInput.mockResolvedValueOnce("Moto")
    mockInput.numberInput.mockResolvedValueOnce(1200)
    await systemUnderTest.execute()
    const editedproduct = mockproducts[0]
    expect(editedproduct.name).toBe("Moto")
    expect(editedproduct.price).toEqual(1200)
  })
  it("should not edit",async () => {
    mockInput.textInput.mockResolvedValueOnce('1312312')
    await systemUnderTest.execute()
    expect(console.log).toHaveBeenNthCalledWith(1,"Esse produto não existe") 
  })
});
