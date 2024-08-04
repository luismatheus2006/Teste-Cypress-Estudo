import { Email, Senha, Conta1, Conta2, Conta1Alt, Conta2Alt, Data1, Data2 , Name , Login , CriarConta1 , CriarConta2 ,GerarMovimentações , ExcluirContas, ExcluirMovimentacao} from './variaveis';

function G(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const RandomNumber = G(25);

Cypress.Commands.add('Feature01_Login', () => {  
    //Cadastro
    cy.log('Cadastro')
    
    cy.contains('Novo usuário?').click();
    cy.get('#nome').type(`${Name}`);
    cy.get('#email').type(`${RandomNumber}${Email}`);
    cy.get('#senha').type(`${RandomNumber}${Senha}`);
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');

    //Fluxo alternativo
    cy.log('Fluxo alternativo para ver se o sistema valida o login');
    cy.get('#email').type(`NaoEstaCadastradoNoSitema${RandomNumber}@gmail.com`);
    cy.get('#senha').type(`UmnumeroAidefibonatiOuAlgoAssi${RandomNumber}`);
    cy.contains('Entrar').click();
    cy.contains('Problemas com o login do usuário').should('be.visible');

    cy.contains('Entrar').click();
    cy.contains('Email é um campo obrigatório').should('be.visible');
    cy.contains('Senha é um campo obrigatório').should('be.visible');

    //Login no sistema
    cy.get('#email').type(`${RandomNumber}${Email}`);
    cy.get('#senha').type(`${RandomNumber}${Senha}`);
    cy.contains('Entrar').click();
    cy.contains(`Bem vindo, ${Name}!`).should('be.visible');
  });

  Cypress.Commands.add('Feature02_Contas', () => { 
    Login();
    //Adicionar 2 contas
    CriarConta1();
    CriarConta2();
    //Listar todas as contas
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.contains(`${Conta1}`).should('be.visible');
    cy.contains(`${Conta2}`).should('be.visible');
    //Alterar nome das contas
    cy.get("[class='glyphicon glyphicon-edit']").eq(0).click();
    cy.get('#nome').clear().type(`${Conta1Alt}71`);
    cy.contains('Salvar').click()

    cy.get("[class='glyphicon glyphicon-edit']").eq(1).click();
    cy.get('#nome').clear().type(`${Conta2Alt}72`);
    cy.contains('Salvar').click();

    cy.contains(`${Conta1Alt}71`).should('be.visible');
    cy.contains(`${Conta2Alt}72`).should('be.visible');

    //Fluxo alternativo conta com nome ja existente
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta1Alt}71`);
    cy.contains('Salvar').click();
    cy.contains('Já existe uma conta com esse nome!').should('be.visible');

    //Excluir uma conta com uma movimentação
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma');
    cy.get('#interessado').type('Seu Madruga');
    cy.get('#valor').type('12');
    cy.contains('Salvar').click();
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.contains('Conta em uso na movimentações').should('be.visible');  
    //Excluir movimentação
    cy.contains('Resumo Mensal').click();
    cy.get('#mes').select('Fevereiro');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');
    //Excluir contas
    ExcluirContas();
    
})

Cypress.Commands.add('Feature03_Movimentação', () => {  
    Login();
    //Criar 2 contas
    CriarConta1();
    CriarConta2();

    //Criar no mínimo 2 movimentações para cada conta, 2 para cada situação, 2 meses diferentes;
    GerarMovimentações();

    //Validar campo data
    cy.get('#data_transacao').type(`12032023`);
    cy.get('#data_pagamento').type(`12042023`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${Conta1}`);
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
    cy.get('#conta').select(`${Conta1}`);
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
    cy.get('#conta').select(`${Conta1}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Valor deve ser um número').should('be.visible');
  
    //Excluir movimentações
    ExcluirMovimentacao();
    
    //Excluir contas
    ExcluirContas();

})

Cypress.Commands.add('Feature04_Resumo_mensal', () => {  
    Login();
    CriarConta1();
    CriarConta2();
    GerarMovimentações();
    //Utilize os filtros para exibir as movimentações criadas;
    cy.contains('Resumo Mensal').click();
    cy.get('#mes').select('Abril');
    cy.contains('Buscar').click();

    cy.contains('Buscar').click();
    cy.get('#mes').select('Fevereiro');
    cy.contains('Buscar').click();
    
    
    //Excluir movimentações
    ExcluirMovimentacao();

    //Excluir contas
    ExcluirContas();

})
Cypress.Commands.add('Feature05_Logout', () => {   
    Login();
    //Logout
    cy.contains('Sair').click()
    cy.contains('Login').should('be.visible');
})