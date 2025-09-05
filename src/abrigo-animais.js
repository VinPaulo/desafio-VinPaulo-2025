class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisInfo = {
      Rex: ['RATO', 'BOLA'],
      Mimi: ['BOLA', 'LASER'],
      Fofo: ['BOLA', 'RATO', 'LASER'],
      Zero: ['RATO', 'BOLA'],
      Bola: ['CAIXA', 'NOVELO'],
      Bebe: ['LASER', 'RATO', 'BOLA'],
      Loco: ['SKATE', 'RATO']
    };

    const brinquedosValidos = new Set();
    Object.values(animaisInfo).forEach(arr => arr.forEach(b => brinquedosValidos.add(b)));

    function temDuplicados(arr) {
      return new Set(arr).size !== arr.length;
    }

    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase()).filter(b => b.length > 0);
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase()).filter(b => b.length > 0);
    const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());

    if (temDuplicados(brinquedos1) || temDuplicados(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

    for (const b of brinquedos1) {
      if (!brinquedosValidos.has(b)) return { erro: 'Brinquedo inválido' };
    }
    for (const b of brinquedos2) {
      if (!brinquedosValidos.has(b)) return { erro: 'Brinquedo inválido' };
    }

    if (temDuplicados(animaisOrdem)) {
      return { erro: 'Animal inválido' };
    }

    for (const a of animaisOrdem) {
      if (!animaisInfo[a]) {
        return { erro: 'Animal inválido' };
      }
    }
    function temBrinquedosNaOrdem(brinquedosPessoa, brinquedosFavoritos) {
      let idxPessoa = 0;
      for (const fav of brinquedosFavoritos) {
        while (idxPessoa < brinquedosPessoa.length && brinquedosPessoa[idxPessoa] !== fav) {
          idxPessoa++;
        }
        if (idxPessoa === brinquedosPessoa.length) {
          return false;
        }
        idxPessoa++;
      }
      return true;
    }
    const adotadosPessoa1 = [];
    const adotadosPessoa2 = [];

    const resultado = [];

    function podeAdotar(pessoa) {
      if (pessoa === 1) return adotadosPessoa1.length < 3;
      if (pessoa === 2) return adotadosPessoa2.length < 3;
      return false;
    }

    function locoTemCompanhia() {
      return adotadosPessoa1.length + adotadosPessoa2.length > 0;
    }

    for (let animal of animaisOrdem) {
      const favs = animaisInfo[animal];

      let pessoa1Tem = false;
      if (animal === 'Loco') {
        pessoa1Tem = brinquedos1.some(b => favs.includes(b)) && locoTemCompanhia();
      } else {
        pessoa1Tem = temBrinquedosNaOrdem(brinquedos1, favs);
      }

      let pessoa2Tem = false;
      if (animal === 'Loco') {
        pessoa2Tem = brinquedos2.some(b => favs.includes(b)) && locoTemCompanhia();
      } else {
        pessoa2Tem = temBrinquedosNaOrdem(brinquedos2, favs);
      }

      const gatos = ['Mimi', 'Fofo', 'Zero'];
      if (gatos.includes(animal) && pessoa1Tem && pessoa2Tem) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      if (pessoa1Tem && pessoa2Tem) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      if (pessoa1Tem && podeAdotar(1)) {
        adotadosPessoa1.push(animal);
        resultado.push(`${animal} - pessoa 1`);
        continue;
      }

      if (pessoa2Tem && podeAdotar(2)) {
        adotadosPessoa2.push(animal);
        resultado.push(`${animal} - pessoa 2`);
        continue;
      }

      resultado.push(`${animal} - abrigo`);
    }

    resultado.sort();

    return { erro: null, lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
