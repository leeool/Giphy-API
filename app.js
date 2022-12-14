/*
  Neste exercício, vamos praticar um pouco do que vimos até aqui, através da 
  API do GIPHY, que é um website de GIFs (https://giphy.com/).

  - Seu desafio é implementar uma funcionalidade de busca dos GIFs. Quando o 
    usuário digitar o termo de busca no input e pressionar enter, um GIF deve 
    ser exibido na tela. Como neste exemplo: https://youtu.be/RHe-uCJGCeA
  - Observe que o GIF mais recente é inserido acima dos GIFs anteriores;
  - Para fazer requests para a API do GIPHY, você precisará de uma API key. 
    Para obtê-la, siga os seguintes passos:
    - Acesse https://developers.giphy.com/dashboard/ e faça o login;
    - No Dashboard, clique em "Create an App", clique em "API Selected" e em 
      "Next Step";
    - Dê um nome e descrição para o app e crie-o;
    - Clique no código da API key para copiá-la;
  - O submit do form deve ser feito para o endpoint abaixo. Atente-se para os 2
    [PLACEHOLDERS] que devem ser substituídos:
    - https://api.giphy.com/v1/gifs/search?api_key=[SUA_CHAVE_DA_API_AQUI]&limit=1&q=[VALOR_INSERIDO_NO_INPUT]
    - Se quiser testar outras possibilidades, os endpoints da API estão 
      listados na documentação: https://developers.giphy.com/docs/api/endpoint#search
  - Ignore os avisos no console. Para limpá-lo, pressione "ctrl + L".
*/

let output = document.querySelector(".out")
const form = document.querySelector("form")

const APIKey = "ADswUEnQr08FQFoTMDE6tmbtG4eb5oCz"

const getGIPHYApiUrl = (GiFName) =>
  `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&rating=g&tag=${GiFName}`

const fetchAPI = async (event) => {
  event.preventDefault()

  const inputValue = event.target.input.value
  
  try {
    const response = await fetch(getGIPHYApiUrl(inputValue))

    if (!response.ok) {
      throw new Error("Não foi possivel obter os dados da API")
    }

    const gifData = await response.json()
    const gifContentUrl = gifData.data.images.downsized.url
    const gifTitle = gifData.data.title

    insertGifIntoHTML(gifContentUrl, gifTitle)
  } catch (error) {
    alert(`Erro: ${error.message}`)
  }
}

form.addEventListener("submit", fetchAPI)

const insertGifIntoHTML = (content, alt) => {
  const img = document.createElement("img")
  let title = document.createElement("h2")
  img.setAttribute("src", content)
  img.setAttribute("alt", alt)
  title.textContent = alt
  output.insertAdjacentElement("afterbegin", img)
  output.insertAdjacentElement("afterbegin", title)
  form.reset()
}
