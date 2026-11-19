# Testes Automatizados com Cypress – SauceDemo

Atividade prática da disciplina **Qualidade e Testes de Software** (FATEC): automação de testes E2E em uma loja virtual usando [Cypress](https://www.cypress.io/).

O sistema testado é o [SauceDemo](https://www.saucedemo.com/), um site de demonstração da Sauce Labs feito para praticar testes. Os produtos são fictícios e o checkout não faz pagamento real.

## Testes

Os 7 testes ficam em [`cypress/e2e/loja.cy.js`](cypress/e2e/loja.cy.js). Cada um faz o próprio login e roda de forma independente dos demais.

| Teste | Cenário | Verificação |
| --- | --- | --- |
| 01 | Login válido | Título "Products" e URL `/inventory.html` |
| 02 | Login inválido | Mensagem de erro e permanência na tela de login |
| 03 | Adicionar produtos ao carrinho | 2 itens no carrinho, com nomes e preços corretos |
| 04 | Remover produto do carrinho | Apenas 1 item restante no carrinho |
| 05 | Finalizar uma compra | Mensagem "Thank you for your order!" |
| 06 | Ordenação de produtos | Preços em ordem crescente após escolher "Price (low to high)" |
| 07 | Logout | Retorno à tela de login |

**Resultado:** 7 testes, 7 aprovados, 0 falhas.

Vídeo da execução: _adicionar link do YouTube_

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Como executar

Com a interface gráfica do Cypress, que mostra cada passo dos testes:

```bash
npm run cy:open
```

Escolha **E2E Testing**, depois um navegador, e clique em `loja.cy.js`.

Somente no terminal, sem interface:

```bash
npm test
```

## Estrutura

```
├── cypress/
│   ├── e2e/
│   │   └── loja.cy.js      # os 7 testes
│   └── support/
│       ├── commands.js     # comando personalizado cy.login()
│       └── e2e.js          # carrega os comandos antes dos testes
├── cypress.config.js       # baseUrl do SauceDemo e tamanho da tela
└── package.json
```

## Comando `cy.login()`

Definido em `cypress/support/commands.js`, ele abre o site, preenche usuário e senha e clica em Login. Sem argumentos, usa as credenciais de demonstração (`standard_user` / `secret_sauce`):

```js
cy.login()                                   // usuário padrão
cy.login('invalid_user', 'invalid_password') // credenciais específicas
```
