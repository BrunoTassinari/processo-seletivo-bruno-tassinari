import methods from "./methods.js";
import readline from "readline";

const output = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Inicial o programa
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
    //Aguarda a resposta de option e executa a respectiva função
     option => {
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
          //Caso aperte 5, o metodo close encerra o programa
          console.clear();
          output.close();
          break;
        default:
          //Casp padrao, caso seja colocado um valor diferente do esperado
          console.clear();
          console.log("\n ## Opção inválida ##");
          menu();
      }
    }
  );
};

function option1(){
  //Manda uma mensagem no console e aguarda, dependendo da resposta realiza uma ação
  output.question(
    "\n [1] Voltar ao menu.\n ======================= \n Informe o ano de pesquisa: ",
    year => {
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
    name => {
      let item;

      if (name != "") {
        item = methods.criptName(name);
      }
      if (name == "1") {
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
    year => {
      if (year == "1") {
        console.clear();
        menu();
      } else {
        let item = methods.averageYear(year);
        verifyCases(item, option3);
      }
    }
  );
}

function option4(){
  output.question(
    "\n [1] Voltar ao menu.\n ======================= \n Pressione qualquer tecla para os resultados: ",
    reponse => {
      if (reponse == "1") {
        console.clear();
        menu();
      } else {
        let item = methods.showRankinsStudents();
        verifyCases(item, option4);
      }
    }
  );
}

function verifyCases(returnItem, callback){
  //Verifica se o returnItem é undefined ou não, para ver se foi digitado um dado esperado
  if (returnItem == undefined) {
    console.clear();
    console.log("\n ## Não foi localizado nenhum item ou dado inválido ##");
    callback();
  } else {
  //Se não for, mostra o resultado e chama a o callback que nesse caso será a opção de digitar outro valor ou voltar a função passada como parametro
    console.clear();
    console.log("------------------------------------------------------------");
    console.log(returnItem);
    console.log("------------------------------------------------------------");
    callback();
  }
}