export function valida(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  // validando os erros do formulario e inserindo no HTML
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

// tipos de erro
const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'customError'];

// messagens para os erros
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
  cpf: {
    valueMissing: 'O campo de cpf não pode estar vazio',
    customError: 'O CPF digitado nao e valido',
  },
};

// validadores
const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
  cpf: (input) => validaCPF(input),
};

// mensagem de erro
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

function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, '');
  let mensagem = '';

  if (!checaCPFRepetido(cpfFormatado)) {
    mensagem = 'O CPF digitado nao e valido';
  }

  input.setCustomValidity(mensagem);
}

// validando cpf de numeros repetidos
function checaCPFRepetido(cpf) {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  let cpfValido = true;

  valoresRepetidos.forEach((valor) => {
    if (valor == cpf) {
      cpfValido = false;
    }
  });

  return cpfValido;
}
