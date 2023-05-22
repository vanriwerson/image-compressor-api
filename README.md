# Image Compressor Api
> Esse projeto foi desenvolvido para um desafio técnico. Seu objetivo é manipular imagens a partir de uma url pública,
> salvando no sistema de arquivos tanto a imagem original quanto uma versão compactada com base em uma taxa de compressão
> fornecida pelo usuário.

## Como utilizar
1. Clone esse reposítório em sua máquina:
~~~bash
git clone https://github.com/vanriwerson/image-compressor-api.git
~~~

2. Navegue para o diretório raiz do projeto e instale as dependências:
~~~bash
cd image-compressor-api && npm install
~~~

3. Prepare as variáveis de ambiente de acordo com o arquivo de exemplo `.env.example`:
~~~bash
API_PORT=3000
MONGODB_URL=mongodb://localhost:27017
~~~

##### ⚠️ Esse projeto utiliza o Docker para criar uma instâcia do MongoDB. ⚠️

4. Inicie o banco de dados:
~~~bash
docker-compose up
~~~
5. Inicie a api (Ela rodará na porta indica pelo arquivo .env):
~~~bash
npm start
~~~

### 6. Envie uma requisição:
- A requisição deve utilizar o método POST;
- Ela deve ser feita ao endpoint `{BASE_URL}/image/save`, passando no body a url da imagem desejada e o fator de compressão da imagem:
~~~bash
{
  "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
  "compress": 0.7
}
~~~
- Ao enviar dados válidos, a aplicação irá salvar as imagens no sistema de arquivos e retornará uma resposta parecida com a seguinte:
~~~bash
{
  "localpath": {
      "original": "/path/to/original.jpg",
      "thumb": "/path/to/thumb.jpg",
  },
  "metadata": {
      "EXIF_KEY_DATA": "metadata.exif has lots of data O.O"
  }
}
~~~

## Tecnologias utilizadas

##### [NestJS](https://nestjs.com/)
Foi o framework Node.js escolhido pela empresa para esse desafio.

##### [MongoDB](https://www.mongodb.com/)
Foi o banco de dados escolhido pela empresa para esse desafio.

##### [Mongoose](https://mongoosejs.com/)
Optei por utilizar um ODM para facilitar a implementação desse projeto.

##### [Docker](https://docs.docker.com/compose/)
Essa aplicação utiliza o Docker para gerar uma instância do banco de dados e salvar as imagens no sistema de arquivos.

##### [Axios](https://www.npmjs.com/package/axios#package-manager)
No contexto dessa aplicação, foi utilizado para fazer o download de imagens através de sua url.

##### [Sharp](https://www.npmjs.com/package/sharp)
No contaxto dessa aplicação, foi utilizado para fazer o download de imagens através de sua url.

Developer: [Bruno Riwerson Silva](https://www.linkedin.com/in/bruno-riwerson/)
