import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import CartCard from "../components/Cart/CartCard"
import ProductCard from "../components/ProductsList/ProductCard"

const productMock = {
    id: "1",
    image: "image",
    title: "produto teste",
    price: 1000,
    quantity: 1
}

const addToCartMock = jest.fn()

const removeToCartMock = jest.fn()

describe("Cart Card", () => {

    test("testa quando o produto de compra for clicado chama a função de adicionar ao carrinho", async () => {

        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const addBtn = screen.getByRole('button', { name: /buy/i })

        await user.click(addBtn)

        expect(addToCartMock).toBeCalled()

        render(<CartCard product={productMock} removeToCart={removeToCartMock}/>)

        const title = screen.getByRole('heading', {name: /produto teste/i})
        const image = screen.getByRole('img', {name: /produto teste/i})
        const price = screen.getByText(/\$1000\.00/i)
        const removeBtn = screen.getByRole('button', { name: /remove/i })

        
        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(removeBtn).toBeInTheDocument()
    })
})