


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
export const ContaPermanente1 = "Permanente1";
export const ContaPermanente2 = "Permanente2";

export function Login(){

    cy.log('Login');
    cy.get('#email').type(`${Email}`);
    cy.get('#senha').type(`${Senha}`);
    cy.contains('Entrar').click();
    cy.contains(`Bem vindo, ${Name}!`).should('be.visible');

}

    
