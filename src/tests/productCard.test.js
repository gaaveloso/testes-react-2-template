import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

const productMock = {
    id: "1",
    image: "image",
    title: "produto teste",
    price: 1000
}

const addToCartMock = jest.fn()

describe("Product Card", () => {
    test("testar renderizar card de produto", () => {

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const title = screen.getByText("produto teste")
        expect(title).toBeInTheDocument()
    })

    test("testar a renderização do titulo, imagem, preço e botão de compra", () => {
        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const title = screen.getByRole('heading', {name: /produto teste/i})
        const image = screen.getByRole('img', {name: /produto teste/i})
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', {name: /buy/i})

        // screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    test("testa quando o produto de compra for clicado chama a função de adicionar ao carrinho", async () => {

        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const addBtn = screen.getByRole('button', { name: /buy/i })

        await user.click(addBtn)

        expect(addToCartMock).toBeCalled()
    })
})