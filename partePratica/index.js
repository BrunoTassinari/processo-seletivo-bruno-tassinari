import metodos from "./metodos.js";
import readline from "readline";

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu(){
  return leitor.question(
    `
    -----------------------------------
    Qual opção deseja?

    [1] Primeiro bolsista do ano
    [2] Busca por nome 
    [3] Media valores do ano
    [4] Colocação de valores de bolsas
    [5] Sair
    ------------------------------------
    `,
    function (opcao) {
      switch (opcao) {
        case "1":
          console.clear();
          option1();
          break;
        case "2":
          console.clear();
          option2();
          break;
        case "3":
          console.clear();
          option3();
          break;
        case "4":
          console.clear();
          option4();
          break;
        case "5":
          console.clear();
          leitor.close();
          break;
        default:
          console.clear();
          console.log("\n ## Opção inválida ##");
          menu();
      }
    }
  );
};

menu();

const option1 = () => {
  leitor.question(
    "\n [1] Voltar ao menu.\n ======================= \n Informe o ano de pesquisa: ",
    (ano) => {
      if (ano == "1") {
        console.clear();
        menu();
      } else {
        let item = metodos.filtrarPorAno(ano);
        verificaCasos(item, option1);
      }
    }
  );
};

const option2 = () => {
  leitor.question(
    "\n [1] Voltar ao menu.\n ------------------------------------ \n Informe o nome para pesquisa: ",
    (nome) => {
      let item;

      if (nome != "") {
        item = metodos.codificaNome(nome);
      }
      if (nome == "1") {
        console.clear();
        menu();
      }
      verificaCasos(item, option2);
    }
  );
};

const option3 = () => {
  leitor.question(
    "\n [1] Voltar ao menu.\n ======================= \n Informe o ano de pesquisa: ",
    (ano) => {
      if (ano == "1") {
        console.clear();
        menu();
      } else {
        let item = metodos.mediaPorAno(ano);
        verificaCasos(item, option3);
      }
    }
  );
};

const option4 = () => {
  leitor.question(
    "\n [1] Voltar ao menu.\n ======================= \n Pressione qualquer tecla para os resultados: ",
    (reponse) => {
      if (reponse == "1") {
        console.clear();
        menu();
      } else {
        let item = metodos.mostraRankinsBolsistas();
        verificaCasos(item, option4);
      }
    }
  );
};
const verificaCasos = (retorno, callback) => {
  if (retorno == undefined) {
    console.clear();
    console.log("\n ## Não foi localizado nenhum item ou dado inválido ##");
    callback();
  } else {
    console.clear();
    console.log("------------------------------------------------------------");
    console.log(retorno);
    console.log("------------------------------------------------------------");
    callback();
  }
};
