
import { Product  } from "../../core/domain/entities"
import { IInput } from "../../core/interfaces"
import { registerProductUseCase } from "../../core/use-cases"

describe("registerProductUseCase",() =>{
  let mockInput: jest.Mocked<IInput>
  let mockProducts: Product[]
  let systemUnderTest: registerProductUseCase
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    }
    mockProducts = []
    systemUnderTest = new registerProductUseCase(mockProducts,mockInput)
  })
  afterEach(() =>{
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it("should register new service",async () =>{
    mockInput.textInput.mockResolvedValueOnce("Carro vrrom")
    mockInput.numberInput.mockResolvedValueOnce(120)
    await systemUnderTest.register()
    expect(mockProducts.length).toEqual(1)
    expect(mockProducts[0].name).toEqual("Carro vrrom")
    expect(mockProducts[0].price).toEqual(120)
  })
})
