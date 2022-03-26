import methods from "./methods.js";
import readline from "readline";

const output = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

menu();

function menu(){
  return output.question(
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
    function (option) {
      switch (option) {
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
          output.close();
          break;
        default:
          console.clear();
          console.log("\n ## Opção inválida ##");
          menu();
      }
    }
  );
};

function option1(){
  output.question(
    "\n [1] Voltar ao menu.\n ======================= \n Informe o ano de pesquisa: ",
    (year) => {
      if (year == "1") {
        console.clear();
        menu();
      } else {
        let item = methods.filterByYear(year);
        verifyCases(item, option1);
      }
    }
  );
}

function option2(){
  output.question(
    "\n [1] Voltar ao menu.\n ------------------------------------ \n Informe o nome para pesquisa: ",
    (nome) => {
      let item;

      if (nome != "") {
        item = methods.criptName(nome);
      }
      if (nome == "1") {
        console.clear();
        menu();
      }
      verifyCases(item, option2);
    }
  );
}

function option3(){
  output.question(
    "\n [1] Voltar ao menu.\n ======================= \n Informe o ano de pesquisa: ",
    (ano) => {
      if (ano == "1") {
        console.clear();
        menu();
      } else {
        let item = methods.averageYear(ano);
        verifyCases(item, option3);
      }
    }
  );
}

function option4(){
  output.question(
    "\n [1] Voltar ao menu.\n ======================= \n Pressione qualquer tecla para os resultados: ",
    (reponse) => {
      if (reponse == "1") {
        console.clear();
        menu();
      } else {
        let item = methods.showRankinsBaggers();
        verifyCases(item, option4);
      }
    }
  );
}

function verifyCases(returnItem, callback){
  if (returnItem == undefined) {
    console.clear();
    console.log("\n ## Não foi localizado nenhum item ou dado inválido ##");
    callback();
  } else {
    console.clear();
    console.log("------------------------------------------------------------");
    console.log(returnItem);
    console.log("------------------------------------------------------------");
    callback();
  }
}