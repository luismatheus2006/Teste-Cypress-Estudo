import { Senha, Conta1, Conta2, Name } from './variaveis';

function G(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const RandomNumber = G(25);

Cypress.Commands.add('FluxoCadastroLogin', (Cadastro) => {  
    cy.contains('Novo usuário?').click();
    cy.get('#nome').type(`${Name}`);
    cy.get('#email').type(`${RandomNumber}${Cadastro.Email}`);
    cy.get('#senha').type(`${Senha}`);
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');

    cy.get('#email').type(`${RandomNumber}${Cadastro.Email}`);
    cy.get('#senha').type(`${Senha}`);
    cy.contains('Entrar').click();
    cy.contains(`Bem vindo, ${Name}!`).should('be.visible');
})

Cypress.Commands.add('FluxoLoginInvalido', (LoginInvalido) => {  
    //Fluxo alternativo
    cy.log('Fluxo alternativo para ver se o sistema valida o login');
    cy.get('#email').type(LoginInvalido.Email);
    cy.get('#senha').type(`${RandomNumber}`);
    cy.contains('Entrar').click();
    cy.contains('Problemas com o login do usuário').should('be.visible');

    cy.contains('Entrar').click();
    cy.contains('Email é um campo obrigatório').should('be.visible');
    cy.contains('Senha é um campo obrigatório').should('be.visible');

  });

  Cypress.Commands.add('FluxoCriarContas', (CriarConta) => { 

    //Adicionar 2 contas
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(CriarConta.Conta);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');

    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.contains(CriarConta.Conta).should('be.visible');
   

})
Cypress.Commands.add('FluxoAlterarNomeConta', () => { 
     
    cy.get("[class='glyphicon glyphicon-edit']").eq(0).click();
    cy.get('#nome').clear().type(`${Conta1}71`);
    cy.contains('Salvar').click()

    cy.get("[class='glyphicon glyphicon-edit']").eq(1).click();
    cy.get('#nome').clear().type(`${Conta2}53`);
    cy.contains('Salvar').click();

    cy.contains(`${Conta1}71`).should('be.visible');
    cy.contains(`${Conta2}53`).should('be.visible');
})

Cypress.Commands.add('FluxoAlternativoContaNomeJaExistente', () => { 
     
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta1}`);
    cy.contains('Salvar').click();
    cy.contains('Já existe uma conta com esse nome!').should('be.visible');
})

Cypress.Commands.add('FluxoExcluirContaComMovimentação', () => {

    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.contains('Conta em uso na movimentações').should('be.visible');  
})  


Cypress.Commands.add('FluxoCriarMovimentacao', (CriarMovimentacao) => {  
    
    //Criar movimentações
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').clear().type(CriarMovimentacao.Data);
    cy.get('#data_pagamento').clear().type(CriarMovimentacao.Data);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type(CriarMovimentacao.Valor)
    cy.get('#conta').select(CriarMovimentacao.Conta);
    cy.get(`${CriarMovimentacao.Status}`).click();
    cy.get('#tipo').select(CriarMovimentacao.Tipo);
    cy.contains('Salvar').click();
    cy.contains(CriarMovimentacao.Resposta).should('be.visible');

   
})

Cypress.Commands.add('FluxoResumoMensal', () => {  
    //Utilize os filtros para exibir as movimentações criadas;
    cy.contains('Resumo Mensal').click();
    cy.get('#mes').select('Abril');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');

    cy.contains('Buscar').click();
    cy.get('#mes').select('Fevereiro');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');
    
})
Cypress.Commands.add('FluxoSairConta', () => {   
    //Sair
    cy.contains('Sair').click()
    cy.contains('Login').should('be.visible');
})