import { Product } from "../../core/domain/entities/Product";
import { IInput } from "../../core/interfaces";
import { deleteProductUseCase } from "../../core/use-cases/products/delete-product";

describe("deleteProductUseCase", () => {
  let mockInput: jest.Mocked<IInput>;
  let mockProducts: Product[];
  let systemUnderTest: deleteProductUseCase;
  beforeEach(() => {
    (mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    }),
      (mockProducts = [new Product({ name: "Carro", price: 12 })]);
    systemUnderTest = new deleteProductUseCase(mockProducts, mockInput);
    jest.spyOn(console,"log").mockImplementation(() =>{})
  });
  it("should delete product",async () =>{
    const product = mockProducts[0]
    mockInput.textInput.mockResolvedValueOnce(product.getID)
    await systemUnderTest.execute()
    expect(mockProducts.length).toEqual(0)
  })
  it("should not delete product",async () =>{
    mockInput.textInput.mockResolvedValueOnce("d312312")
    await systemUnderTest.execute()
    expect(console.log).toHaveBeenNthCalledWith(1,"Esse produto não existe")
  })
});
