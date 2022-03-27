import csv from "csvtojson";

const methods = {
  getStudentsListJson: async () => {
    return await csv().fromFile("./src/data.csv")
  },

  async filterByYear(year) {
    let studentsFilter = [];
    let selectStudent;

    // Recebe todos os bolsistas com o ano de parametro
    studentsFilter = (await this.getStudentsListJson()).filter(student => {
      return student.AN_REFERENCIA == year;
    });

    //Recebe apenas o primeiro elemento (o primeiro que entrou)
    selectStudent = studentsFilter[0];

    //Apenas um controle caso não possua nenhum bolsista com o valor informado
    if (selectStudent == null) {
      return undefined;
    }

    return {
      Nome: selectStudent.NM_BOLSISTA,
      CPF: selectStudent.CPF_BOLSISTA,
      Entidade_de_ensino: selectStudent.NM_ENTIDADE_ENSINO,
      Valor_bolsa: selectStudent.VL_BOLSISTA_PAGAMENTO,
    };
  },
  async criptName(name) {
    const semAcento = /([\u0300-\u036f]|[^0-9a-zA-Z\s])/g

    // Transforma o nome inserido como parametros para um modelo padrao
    let transformedName = name.toUpperCase();
    transformedName = transformedName
      .normalize("NFD")
      .replace(semAcento, "");

    // Percorre a lista de bolsistas e se no nome do bolsista conter a palavra de parametro, atribui o bolsista a searchStudentByName
    let searchStudentByName = (await this.getStudentsListJson()).filter((student) => {
      let currentStudentName = student.NM_BOLSISTA;
      if (currentStudentName.includes(transformedName)) {
        return student;
      }
    });

    //Atribui o primeiro elemento localizao em searchStudentByName para selectStudent
    let selectStudent = searchStudentByName[0];

    // Verificando se foi localizado um bolsista, se não foi, retorne ubdefined
    if (selectStudent == null) {
      return undefined;
    }

    const alfabeth = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "A",
    ];

    // Quebra no no bolsista selecionado e quebra em um vetor, em seguida substitui para a próxima letra do alfabeto
    let nameSelectStudent = selectStudent.NM_BOLSISTA;
    nameSelectStudent = nameSelectStudent.split("");

    for (let i = 0; i < nameSelectStudent.length; i++) {
      let indexCaracter = alfabeth.indexOf(nameSelectStudent[i]);

      if (indexCaracter != -1) {
        nameSelectStudent[i] = alfabeth[indexCaracter + 1];
      }
    }

    // Faz a troca da primeira letra pela ultima
    let aux = nameSelectStudent[0];
    nameSelectStudent[0] = nameSelectStudent[nameSelectStudent.length - 1];
    nameSelectStudent[nameSelectStudent.length - 1] = aux;

    // Casp o nome seja maior que 3, faz a reversao das letras, caso contrarios, permanace só a substituição da primeira pela ultima
    if (nameSelectStudent.length > 3) {
      selectStudent.NM_BOLSISTA = nameSelectStudent.reverse().join("");
    }

    selectStudent.NM_BOLSISTA = nameSelectStudent.join("");

    return {
      Nome: selectStudent.NM_BOLSISTA,
      Ano: selectStudent.AN_REFERENCIA,
      Entidade_de_ensino: selectStudent.NM_ENTIDADE_ENSINO,
      Valor_bolsa: selectStudent.VL_BOLSISTA_PAGAMENTO,
    };
  },
  async averageYear(year) {
    let totalValue = [];

    //Filtra os bolsista que tem o ano referencia igual o ano parametro
    (await this.getStudentsListJson()).filter((student) => {
      if (student.AN_REFERENCIA == parseInt(year)) {
        //Passa para numeros o valor pagamento do bolsista e atribui a totalValue
        let numItem = Number(student.VL_BOLSISTA_PAGAMENTO);
        totalValue.push(numItem);
      }
    });

    //Uma verificação se possuiu algum item com o parametro buscado
    if (totalValue.length == 0) {
      return undefined;
    }

    //Retorna o valor somando-os e fixando duas casas após a virgula
    return (totalValue.reduce((a, b) => a + b) / totalValue.length).toFixed(2);
  },
  async showRankingsStudents() {

    const studentList = await this.getStudentsListJson();

    const studentsValues = [];
    studentList.forEach((student) =>
      studentsValues.push(student.VL_BOLSISTA_PAGAMENTO)
    );

    //Pega os valores de studentsValues e retorna um vetor com os valores unicos;
    const uniqueStudentsValues = [...new Set(studentsValues)];

    //Ordena em ordem crescente o vetor
    const orderValues = uniqueStudentsValues.sort((a, b) => a - b);

    const orderStudentsWithValues = [];

    // Pega o vetor de valores unicos e procura o primeiro elemento dentro de studentsList que satisfazer, quando ocorrer, atribui a orderStudentsWithValues
    orderValues.forEach((value) => {
      orderStudentsWithValues.push(
        studentList.find(
          (student) => student.VL_BOLSISTA_PAGAMENTO == value
        )
      );
    });

    //Separa o vetor em duas partes onde os maiores sao os 3 ultimos e os 3 menores os primeiros
    let studentsLargerValues = orderStudentsWithValues.slice(-3);
    let studentsSmallerValues = orderStudentsWithValues.slice(0, 3);

    return {
      Maiores_valores: studentsLargerValues.reverse(),
      Menores_valores: studentsSmallerValues,
    };
  },
};

export default methods;


