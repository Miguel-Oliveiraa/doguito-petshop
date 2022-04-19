export function valida(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(
      tipoDeInput,
      input,
    );
  }
}

const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'customError'];

const messagensDeErro = {
  nome: {
    valueMissing: 'O campo nome não pode estar vazio',
  },
  email: {
    valueMissing: 'O campo email não pode estar vazio',
    typeMismatch: 'O email digitao não eh valido!',
  },
  senha: {
    valueMissing: 'O campo senha não pode estar vazio',
    patternMismatch:
      'A senha deve conter no minimo 8 caracteres, pelo menos uma letra maiuscula e minuscula, um numero e um caracter especial',
  },
  dataNascimento: {
    valueMissing: 'O campo data de nascimento não pode estar vazio',
    customError: 'Voce deve ser maior que 18 para se cadastrar',
  },
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
};

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = '';
  tiposDeErro.forEach((erro) => {
    if (input.validity[erro]) {
      mensagem = messagensDeErro[tipoDeInput][erro];
    }
  });

  return mensagem;
}

//Validacao da data de nascimento
function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value);
  let mensagem = '';

  if (!maiorQue18(dataRecebida)) {
    mensagem = 'Voce deve ser maior que 18 para se cadastrar';
  }

  input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

  return dataMais18 <= dataAtual;
}
