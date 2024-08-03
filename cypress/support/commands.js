import * as V from './Variaveis';

function getRandomNumber(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const randomNumber = getRandomNumber(25);
const email = `Vivar${randomNumber}@gmail.com`;
const senha = `${randomNumber}`;
const conta1 = `Nome_da_conta${randomNumber}_1`;
const conta2 = `Nome da conta${randomNumber}_2`;
const conta1Alt = `${conta1}71`;
const conta2Alt = `${conta2}97`;
const Data1 = "14/02/2024";
const Data2 = "14/04/2024";

function Login(){

    cy.log('Login');
    cy.get('#email').type(`${email}`);
    cy.get('#senha').type(`${senha}`);
    cy.contains('Entrar').click();
    cy.contains('Bem vindo, Édgar Vivar!').should('be.visible');

}



Cypress.Commands.add('FEATURE01_Login', () => {

    cy.visit('https://seubarriga.wcaquino.me/login');
    
    
    //Cadastro
    cy.log('Cadastro')
    cy.contains('Novo usuário?').click();
    cy.get('#nome').type(`${V.name}`);
    cy.get('#email').type(`${email}` )
    cy.get('#senha').type(`${senha}`);
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');

    //Fluxo alternativo
    cy.log('Fluxo alternativo para ver se o sistema valida o login');
    cy.get('#email').type(`DefinitivamenteUmEmailQueNaoEstaCadastradoNoSitema${randomNumber}@gmail.com`);
    cy.get('#senha').type(`UmnumeroAidefibonatiOuAlgoAssi${randomNumber}`);
    cy.contains('Entrar').click();
    cy.contains('Problemas com o login do usuário').should('be.visible');

    cy.contains('Entrar').click();
    cy.contains('Email é um campo obrigatório').should('be.visible');
    cy.contains('Senha é um campo obrigatório').should('be.visible');

    //Login no sistema
    Login();
  });

  Cypress.Commands.add('FEATURE02_Contas', () => { 
    
    cy.visit('https://seubarriga.wcaquino.me/login');
    Login();
    //Adicionar 2 contas
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${conta1}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');

    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${conta2}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');

    //Listar todas as contas
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.contains(`${conta1}`).should('be.visible');
    cy.contains(`${conta2}`).should('be.visible');
    //Alterar nome das contas
    cy.get("[class='glyphicon glyphicon-edit']").first().click();
    cy.get('#nome').clear().type(`${conta1Alt}`);
    cy.contains('Salvar').click()

    cy.get("[class='glyphicon glyphicon-edit']").last().click();
    cy.get('#nome').clear().type(`${conta2Alt}`);
    cy.contains('Salvar').click();

    cy.contains(`${conta1Alt}`).should('be.visible');
    cy.contains(`${conta2Alt}`).should('be.visible');

    //Fluxo alternativo conta com nome ja existente
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${conta1Alt}`);
    cy.contains('Salvar').click();
    cy.contains('Já existe uma conta com esse nome!').should('be.visible');

    //Excluir uma conta com uma movimentação
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.contains('Salvar').click();
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').first().click();
    cy.contains('Conta em uso na movimentações').should('be.visible');


})

Cypress.Commands.add('FEATURE03_Movimentação', () => {  
    cy.visit('https://seubarriga.wcaquino.me/login');
    Login();

    //Criar no mínimo 2 movimentações para cada conta, 2 para cada situação, 2 meses diferentes;
    //Conta1
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta1Alt}`);
    cy.get('#status_pendente').click();
    cy.get('#tipo').select('Receita');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta1Alt}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    //Conta2
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta2Alt}`);
    cy.get('#status_pendente').click();
    cy.get('#tipo').select('Receita');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta2Alt}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    //Validar campo data
    cy.get('#data_transacao').type(`12032023`);
    cy.get('#data_pagamento').type(`12042023`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta1Alt}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Data da Movimentação inválida (DD/MM/YYYY)').should('be.visible');
    cy.contains('Data do pagamento inválida (DD/MM/YYYY)').should('be.visible');


    cy.get('#data_transacao').type(`ajsdhasj`);
    cy.get('#data_pagamento').type(`asoujdhsaidasi`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${conta1Alt}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Data da Movimentação inválida (DD/MM/YYYY)').should('be.visible');
    cy.contains('Data do pagamento inválida (DD/MM/YYYY)').should('be.visible');


    //Validar campo valor 
    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('idhjausdhiasd')
    cy.get('#conta').select(`${conta2Alt}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Valor deve ser um número').should('be.visible');

})

Cypress.Commands.add('FEATURE04_Resumo_mensal', () => {  
    cy.visit('https://seubarriga.wcaquino.me/login');
    Login();

    //Utilize os filtros para exibir as movimentações criadas;
    cy.contains('Resumo Mensal').click()
    cy.get('#mes').select('Abril');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').first().click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');

    cy.get('#mes').select('Fevereiro');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').first().click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');
})
Cypress.Commands.add('FEATURE05_Logout', () => {   
    cy.visit('https://seubarriga.wcaquino.me/login');
    Login();
    //Logout
    cy.contains('Sair').click()
    cy.contains('Login').should('be.visible');
})