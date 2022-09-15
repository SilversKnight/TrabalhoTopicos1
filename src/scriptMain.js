let jogos = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem('jogos'));
  if (t) jogos = t;
  mostraJogos();
  document.querySelector('#inputNovoJogo').oninput = monitoraCampoAdic;
  document.querySelector('#inputAlteraJogo').oninput = monitoraCampoAlt;
  document.querySelector('#inputNovoJogo').onkeypress = (e) => {
    if (e.key == 'Enter') adicionaJogo();
  };
  document.querySelector('#inputAlteraJogo').onkeypress = (e) => {
    if (e.key == 'Enter') adicionaJogo();
  };

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputNovoJogo').focus();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputNovoJogo').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputAlteraJogo');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaJogo();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraJogo();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaJogo();
  };
};

const mostraJogos = () => {
  const listaDeJogos = document.querySelector('#listaDeJogos');
  listaDeJogos.innerHTML = '';
  console.log(jogos);
  jogos.forEach((t) => {
    let elemJogo = document.createElement('li');
    elemJogo.innerHTML = t.nomeJogo;
    elemJogo.setAttribute('data-id', t.id);
    elemJogo.onclick = () => {
      let campoNomeJogo = document.querySelector('#inputAlteraJogo');
      let campoDataLancamento = document.querySelector('#inputAlteraDataLancamento');
      let campoGeneroJogo = document.querySelector('#inputAlteraGenero');

      ativa('tela3');

      campoNomeJogo.value = t.nomeJogo;
      campoNomeJogo.setAttribute('data-id', t.id);
      campoNomeJogo.focus();

      campoDataLancamento.value = t.dataLancamento;

      campoGeneroJogo.value = t.generoJogo;

    };
    listaDeJogos.appendChild(elemJogo);
  });
  document.querySelector('#estado').innerText = jogos.length;
  if (jogos.length > 0) {
    listaDeJogos.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDeJogos.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

const adicionaJogo = () => {
  let campoNomeJogo = document.querySelector('#inputNovoJogo');
  let campoDataLancamento = document.querySelector('#inputNovaDataLancamento');
  let campoGeneroJogo = document.querySelector('#inputNovoGenero');

  let nomeJogo = campoNomeJogo.value;
  let dataLancamento = campoDataLancamento.value;
  let generoJogo = campoGeneroJogo.value;

  if (nomeJogo != '') {
    jogos.push({
      id: Math.random().toString().replace('0.', ''),
      nomeJogo: nomeJogo,
      dataLancamento: dataLancamento,
      generoJogo: generoJogo,
    });
    campoNomeJogo.value = '';
    campoDataLancamento.value = '';
    campoGeneroJogo.value = '';
    ativa('tela1');
    salvaJogos();
    mostraJogos();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraJogo = () => {
  let campoNomeJogo = document.querySelector('#inputAlteraJogo');
  let campoDataLancamento = document.querySelector('#inputAlteraDataLancamento');
  let campoGeneroJogo = document.querySelector('#inputAlteraGenero');
  
  let idJogo = campoNomeJogo.getAttribute('data-id');
  let i = jogos.findIndex((t) => t.id == idJogo);
  jogos[i].nomeJogo = campoNomeJogo.value;
  jogos[i].dataLancamento = campoDataLancamento.value;
  jogos[i].generoJogo = campoGeneroJogo.value;

  campoNomeJogo.value = '';
  campoNomeJogo.removeAttribute('data-id');
  campoDataLancamento.value = '';
  campoDataLancamento.removeAttribute('data-id');
  campoGeneroJogo.value = '';
  campoGeneroJogo.removeAttribute('data-id');

  ativa('tela1');
  salvaJogos();
  mostraJogos();
};

const apagaJogo = () => {
  let campo = document.querySelector('#inputAlteraJogo');
  let idJogo = campo.getAttribute('data-id');
  jogos = jogos.filter((t) => t.id != idJogo);
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvaJogos();
  mostraJogos();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvaJogos = () => {
  localStorage.setItem('jogos', JSON.stringify(jogos));
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((registration) => {
    console.log('Registro de service worker bem-sucedido', registration);
  }, (error) => {
    console.error(`Registro de service worker bem-sucedido: ${error}`);
  });
} else {
  console.error('Service workers não suportado.');
}