# Desafio_QA-GAC-Luis_Farias


## Observações

Este projeto refere-se ao teste "Desafio QA" do GAC, desenvolvido por **Luis Matheus Vasconcelos de Farias**. Os testes foram implementados utilizando o Cypress e atendem aos requisitos especificados no documento da prova.

Se houver qualquer dúvida ou precisar de mais informações sobre o projeto, sinta-se à vontade para entrar em contato.



# Versões utilizadas

Cypress:13.13.2
Node:20.11.1
mochawesome:7.1.3

#Comandos de instalação

Cypress:npm install cypress --save-dev

Mochawesome: npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev

## Como Rodar o Código e Gerar Relatórios Automatizados

Para executar os testes automatizados e gerar relatórios, você pode utilizar os seguintes comandos:

1. **Rodar os Testes via terminal e Gerar Relatórios Automatizados:**
   Utilize o comando abaixo para rodar os testes no terminal e gerar relatórios automatizados, bem como capturar vídeos das execuções:
   ```bash
   npx cypress run
2. **Rodar os Testes via interface grafica:**
   Utilize o comando abaixo para rodar os testes na interface, porém não irá gerar relatórios automatizados, bem como capturar vídeos das execuções:
   ```bash
   npx cypress open

## Cenarios de teste

### Fluxo de Cadastro e Login

- **Descrição:** 
  Realiza o cadastro de um novo usuário com o email fornecido e verifica se o cadastro foi bem-sucedido. Em seguida, realiza o login com as mesmas credenciais e confirma se o usuário é recebido com uma mensagem de boas-vindas.

### Login Inválido

- **Descrição:**
  Tenta fazer login com um email válido e uma senha incorreta. Verifica se a mensagem de erro adequada ("Problemas com o login do usuário") é exibida. Além disso, testa o login sem preencher o email e senha, confirmando que as mensagens de erro para campos obrigatórios são exibidas.

### Criação e Gerenciamento de Contas

- **Fluxo de Criação de Contas:**
  - **Descrição:** Após o cadastro e login, cria duas contas com nomes fornecidos. Verifica se ambas as contas são adicionadas com sucesso e aparecem na lista de contas.

- **Fluxo de Alteração de Nome de Conta:**
  - **Descrição:** Após criar duas contas, altera os nomes dessas contas. Verifica se os novos nomes são exibidos corretamente após a alteração.

- **Fluxo de Conta com Nome Já Existente:**
  - **Descrição:** Tenta criar uma nova conta com um nome que já existe no sistema. Verifica se a mensagem de erro apropriada ("Já existe uma conta com esse nome!") é exibida.

- **Fluxo de Exclusão de Conta com Movimentação:**
  - **Descrição:** Cria uma conta e adiciona uma movimentação associada a essa conta. Tenta excluir a conta que está em uso na movimentação e verifica se a mensagem de erro ("Conta em uso na movimentações") é exibida.

### Movimentações Financeiras

- **Fluxo de Criação de Movimentações:**
  - **Descrição:** Após criar duas contas, adiciona várias movimentações financeiras em ambas as contas com diferentes datas, valores, tipos e status. Verifica se todas as movimentações são adicionadas corretamente e se a mensagem de sucesso é exibida para cada uma.

- **Fluxo de Validação de Campo Data e Valor:**
  - **Descrição:** Tenta criar movimentações com dados inválidos para os campos de data e valor. Verifica se as mensagens de erro apropriadas são exibidas para data inválida e valor não numérico.

### Resumo Mensal

- **Descrição:**
  Cria movimentações financeiras em duas contas com diferentes datas e valores. Utiliza a funcionalidade de resumo mensal para buscar e remover movimentações de meses específicos. Verifica se as movimentações são removidas com sucesso e se as mensagens de sucesso são exibidas.

### Logout

- **Descrição:**
  Após realizar o login com um usuário, executa o logout e verifica se a página de login é exibida após o logout.

## Estrutura do projeto

1. **Independência dos Testes:**
   Cada fluxo de teste foi projetado para ser autônomo, o que significa que pode ser executado isoladamente sem depender do estado de outros testes. Isso reduz o risco de falhas causadas por interferência entre testes e assegura resultados mais confiáveis.

2. **Parâmetros no Spec:**
   Para evitar a repetição de código e facilitar a manutenção, os parâmetros são passados diretamente nos arquivos de especificação (`spec`). Isso reduz a necessidade de codificação redundante dentro dos comandos personalizados, tornando o código mais limpo e fácil de manter.

3. **Contas Separadas para Cada Teste:**
   Cada teste é executado utilizando uma conta diferente. Isso evita a interferência entre testes e garante que cada cenário seja testado em um ambiente isolado. O uso de contas distintas para cada teste também contribui para a integridade dos dados e a precisão dos resultados.

## Direitos Autorais

© 2024 Luis Matheus Vasconcelos de Farias. Todos os direitos reservados.
