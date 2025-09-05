import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,INVALIDO',
      'RATO,NOVELO',
      'Rex,Fofo'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO',
      'BOLA,NOVELO',
      'Rex,Fofo'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'NOVELO,LASER',
      'Rex,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeNull();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeNull();
  });

  test('Limite de tres animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,SKATE',
      'LASER,RATO,BOLA,CAIXA,NOVELO',
      'Rex,Mimi,Bola,Bebe,Zero'
    );
    expect(resultado.erro).toBeNull();

    const countPessoa1 = resultado.lista.filter(s => s.endsWith('pessoa 1')).length;
    const countPessoa2 = resultado.lista.filter(s => s.endsWith('pessoa 2')).length;

    expect(countPessoa1).toBeLessThanOrEqual(3);
    expect(countPessoa2).toBeLessThanOrEqual(3);
  });

  test('Gatos com brinquedos em comum ficam no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER',
      'BOLA,RATO,LASER',
      'Mimi,Fofo,Zero'
    );
    expect(resultado.erro).toBeNull();
    expect(resultado.lista).toEqual([
      'Fofo - abrigo',
      'Mimi - abrigo',
      'Zero - abrigo'
    ]);
  });

  test('Loco so fica com pessoa se tiver companhia', () => {
    let resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE',
      '',
      'Loco'
    );
    expect(resultado.erro).toBeNull();
    expect(resultado.lista).toEqual(['Loco - abrigo']);
    resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE',
      '',
      'Rex,Loco'
    );
    expect(resultado.erro).toBeNull();
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

});
