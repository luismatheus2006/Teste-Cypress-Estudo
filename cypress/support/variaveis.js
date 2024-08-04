


// Concatenar o número aleatório com o domínio de e-mail

export const Email = `Vivar@gmail.com`;
export const Senha = `Vivar123`;
export const Conta1 = `Nome_da_conta_1`;
export const Conta2 = `Nome da conta_2`;
export const Conta1Alt = `${Conta1}71`;
export const Conta2Alt = `${Conta2}97`;
export const Data1 = "14/02/2024";
export const Data2 = "14/04/2024";
export const Name = "Edgar"

export function Login(){

    cy.log('Login');
    cy.get('#email').type(`${Email}`);
    cy.get('#senha').type(`${Senha}`);
    cy.contains('Entrar').click();
    cy.contains(`Bem vindo, ${Name}!`).should('be.visible');

}
export function CriarConta1(){
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta1}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');

    
}
export function CriarConta2(){


    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(`${Conta2}`);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso!').should('be.visible');
}
export function GerarMovimentações(){
    cy.contains('Criar Movimentação').click();
    cy.get('#data_transacao').type(`${Data1}`);
    cy.get('#data_pagamento').type(`${Data1}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${Conta1}`);
    cy.get('#status_pendente').click();
    cy.get('#tipo').select('Receita');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${Conta1}`);
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
    cy.get('#conta').select(`${Conta2}`);
    cy.get('#status_pendente').click();
    cy.get('#tipo').select('Receita');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');

    cy.get('#data_transacao').type(`${Data2}`);
    cy.get('#data_pagamento').type(`${Data2}`);
    cy.get('#descricao').type('Calma')
    cy.get('#interessado').type('Seu Madruga')
    cy.get('#valor').type('12')
    cy.get('#conta').select(`${Conta2}`);
    cy.get('#status_pago').click();
    cy.get('#tipo').select('Despesa');
    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');
}
export function ExcluirMovimentacao(){ 
    cy.contains('Resumo Mensal').click();
    cy.get('#mes').select('Fevereiro');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');

    cy.get('#mes').select('Abril');
    cy.contains('Buscar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
    cy.contains('Movimentação removida com sucesso!').should('be.visible');
}
export function ExcluirContas(){
    cy.contains('Contas').click();
    cy.contains('Listar').click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').eq(0).click();
    cy.get('[class="glyphicon glyphicon-remove-circle"]').click();
}