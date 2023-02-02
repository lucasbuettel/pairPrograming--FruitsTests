import supertest from "supertest";
import app from "index";
import fruits from "data/fruits";

const api = supertest(app);

describe('Testando a API fruits quando tem frutas', ()=> {

    it('Testando /GET Fruits', async () => {
        const result = await api.get('/fruits');
        

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        );
        expect(result.status).toBe(200);
    })

    it('Testando  /GET fruits:id', async () => {
        
        const result = await api.get('/fruits/2');
            

        expect(result.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
        );
        expect(result.status).toBe(200);
    })

    it('Testando GET / fruits:id quando id não existe', async() =>{

        const result = await api.get('/fruits/6');

        expect(result.status).toBe(404);
    })

})

describe("POST /fruits", () => {
    it("Testando  /Post fruits", async () => {
        const body = {
            name: "abacate",
            price: 9,
        }
        await api.post("/fruits").send(body)

        expect(fruits).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: fruits.length,
                    name: body.name,
                    price: body.price
                })
            ])
        )
    })

    it("Testando POST / com formato invalido", async () =>{
        const body = {
            name: "laranja",
            price: "96",
            outraParada: 1 
        }

        const response = await api.post("/fruits").send(body)
        expect(response.status).toBe(422)
    })

})

