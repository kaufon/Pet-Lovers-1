import { Service } from "../../core/domain/entities"
import { IInput } from "../../core/interfaces"
import { deleteServiceUseCase } from "../../core/use-cases/services/delete-service"

describe("deleteServiceUseCase",() =>{
  let mockInput: jest.Mocked<IInput>
  let mockServices: Service[]
  let systemUnderTest: deleteServiceUseCase
  beforeEach(() =>{
    mockInput = {
      textInput: jest.fn(),
      numberInput: jest.fn(),
      selectInput: jest.fn(),
    },
    mockServices = [new Service({name:"Carro",price:12})]
    systemUnderTest = new deleteServiceUseCase(mockServices,mockInput)
  })
  afterEach(() =>{
    jest.clearAllMocks(),
    jest.resetAllMocks()
  })
  it("should delete an service", async ()=>{
    mockInput.textInput.mockResolvedValueOnce(mockServices[0].getID)
    expect(mockServices.length).toEqual(1)
    await systemUnderTest.execute()
    expect(mockServices.length).toEqual(0)

  })
  it("should not delete service incorrect id",async () =>{
    mockInput.textInput.mockResolvedValueOnce("213312")
    await systemUnderTest.execute()
    expect(mockServices.length).toEqual(1)
  })
})
