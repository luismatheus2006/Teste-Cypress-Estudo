import { Senha, Conta1, Conta2, Data1, Data2 , Name } from './variaveis';

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

  Cypress.Commands.add('FluxoCriarContas', () => { 

    //Adicionar 2 contas
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta1}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');

    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta2}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');
    //Listar todas as contas
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.contains(`${Conta1}`).should('be.visible');
    cy.contains(`${Conta2}`).should('be.visible');

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
})  


Cypress.Commands.add('FluxoCriarMovimentacao', (criarMovimentacao) => {  
    
    //Criar no mínimo 2 movimentações para cada conta, 2 para cada situação, 2 meses diferentes;
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(criarMovimentacao.Conta);
    cy.get('#status_pendente').click();
    cy.get('#tipo').select('Receita');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(criarMovimentacao.Conta);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

})

Cypress.Commands.add('FluxoValidacaoCampoDataValor', () => {  
    //Validar campo data
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`12032023`);
    cy.get('#data_pagamento').type(`12042023`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Data da Movimentação inválida (DD/MM/YYYY)').should('be.visible');
    cy.contains('Data do pagamento inválida (DD/MM/YYYY)').should('be.visible');


    cy.get('#data_transacao').type(`ajsdhasj`);
    cy.get('#data_pagamento').type(`asoujdhsaidasi`);
    cy.get('#descricao').type('Calma');
    cy.get('#interessado').type('Seu Madruga');
    cy.get('#valor').type('12');
    cy.get('#conta').select(`${Conta1}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Data da Movimentação inválida (DD/MM/YYYY)').should('be.visible');
    cy.contains('Data do pagamento inválida (DD/MM/YYYY)').should('be.visible');


    //Validar campo valor 
    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma');
    cy.get('#interessado').type('Seu Madruga');
    cy.get('#valor').type('idhjausdhiasd');
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Valor deve ser um número').should('be.visible');
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