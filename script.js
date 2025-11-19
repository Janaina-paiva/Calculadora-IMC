/*
 * REQUISITO: Criação de funções para manipulação do DOM e interação
 */

// 1. Seleção dos elementos do DOM
const formImc = document.getElementById("form-imc");
const formDieta = document.getElementById("form-dieta");
const resultadoImc = document.getElementById("resultado-imc");
const listaDieta = document.getElementById("lista-dieta");

// Array para armazenar os itens da dieta (para o laço de repetição)
let alimentosRegistrados = [];

/*
 * REQUISITO: Uso de Eventos (onsubmit)
 */

// Função para calcular o IMC (onclick/onsubmit)
formImc.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o recarregamento da página

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  // REQUISITO: Validação básica
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultadoImc.innerHTML =
      '<p style="color: red;">Por favor, insira valores válidos para peso e altura.</p>';
    return;
  }

  // REQUISITO: Funcionalidade lógica real (Cálculo)
  const imc = peso / (altura * altura);
  const classificacao = classificarImc(imc); // Chamada para a função condicional

  // REQUISITO: Manipulação dinâmica do DOM
  resultadoImc.innerHTML = `
        <h3>Seu IMC é: ${imc.toFixed(2)}</h3>
        <p>Classificação: <strong>${classificacao}</strong></p>
    `;
});

/*
 * REQUISITO: Estruturas Condicionais (if/else if/else)
 */
function classificarImc(imc) {
  if (imc < 18.5) {
    return "Abaixo do peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    return "Peso normal";
  } else if (imc >= 25 && imc < 29.9) {
    return "Sobrepeso";
  } else if (imc >= 30 && imc < 34.9) {
    return "Obesidade Grau I";
  } else if (imc >= 35 && imc < 39.9) {
    return "Obesidade Grau II (Severa)";
  } else {
    return "Obesidade Grau III (Mórbida)";
  }
}

// Função para adicionar item à Dieta (onsubmit)
formDieta.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o recarregamento da página

  const alimento = document.getElementById("alimento").value;
  const tipo = document.getElementById("tipo").value;
  const calorias = parseInt(document.getElementById("calorias").value);
  const proteinas = parseInt(document.getElementById("proteinas").value);

  // Validação
  if (
    !alimento ||
    !tipo ||
    isNaN(calorias) ||
    isNaN(proteinas) ||
    calorias < 0 ||
    proteinas < 0
  ) {
    alert("Preencha todos os campos da dieta corretamente.");
    return;
  }

  const novoAlimento = {
    alimento,
    tipo,
    calorias,
    proteinas,
  };

  alimentosRegistrados.push(novoAlimento);

  // Atualiza a exibição da lista
  exibirDieta();

  // Limpa o formulário
  formDieta.reset();
});

/*
 * REQUISITO: Emprego de Laços de Repetição e Manipulação do DOM (Adição de elementos)
 */
function exibirDieta() {
  listaDieta.innerHTML = ""; // Limpa a lista antes de reconstruir

  if (alimentosRegistrados.length === 0) {
    listaDieta.innerHTML = "<p>Nenhum alimento registrado ainda.</p>";
    return;
  }

  // Cria a tabela de exibição
  const table = document.createElement("table");
  table.innerHTML = `
        <thead>
            <tr>
                <th>Alimento</th>
                <th>Refeição</th>
                <th>Calorias (kcal)</th>
                <th>Proteínas (g)</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
  const tbody = table.querySelector("tbody");

  // Laço de Repetição (forEach)
  alimentosRegistrados.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.alimento}</td>
            <td>${item.tipo.toUpperCase()}</td>
            <td>${item.calorias}</td>
            <td>${item.proteinas}</td>
        `;
    tbody.appendChild(row);
  });

  listaDieta.appendChild(table);
}
