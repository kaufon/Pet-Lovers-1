import { Service } from "../../core/domain/entities"
import { IInput } from "../../core/interfaces"
import { registerServiceUseCase } from "../../core/use-cases/services/register-service"

describe("registerServiceUseCase",() =>{
  let mockInput: jest.Mocked<IInput>
  let mockServices: Service[]
  let systemUnderTest: registerServiceUseCase
  beforeEach(() => {
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    }
    mockServices = []
    systemUnderTest = new registerServiceUseCase(mockServices,mockInput)
  })
  afterEach(() =>{
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it("should register new service",async () =>{
    mockInput.textInput.mockResolvedValueOnce("Carro vrrom")
    mockInput.numberInput.mockResolvedValueOnce(120)
    await systemUnderTest.register()
    expect(mockServices.length).toEqual(1)
    expect(mockServices[0].name).toEqual("Carro vrrom")
    expect(mockServices[0].price).toEqual(120)
  })
})
