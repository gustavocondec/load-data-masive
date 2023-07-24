import fs from "fs";

let readFileAndGetJson = (url: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, "utf-8", (err, data) => {
      if (err) reject(err);
      try {
        let jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (e) {
        reject(e);
      }
    });
  });
};

const logicaPersons = async () => {
  let persons = (await readFileAndGetJson("persons.json")) as Array<any>;
  // a.
  let personsWithoutAddress = persons.filter((p) => {
    return !("address" in p);
  });
  console.log(
    'Identificar las personas que no contengan el campo "address" y clonarlos en un nuevo arreglo. ',
    personsWithoutAddress
  );
  // b.
  personsWithoutAddress.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(
    'Ordenar este nuevo arreglo de forma ascendente por el campo "name" y mostrarlo a través de una interfaz web.',
    personsWithoutAddress
  );
  // c.
  let persons20In30AnHorL = persons.filter((p) => {
    if (p.age >= 20 && p.age <= 30) {
      if (p.name.toUpperCase().trim().startsWith("H")) return true;
      if (p.name.toUpperCase().trim().startsWith("L")) return true;
      return false;
    } else return false;
  });
  console.log(
    'Mostrar las personas que tengan una edad entre 20 y 30 años y cuyo nombre empiece por "H" o "L". ',
    persons20In30AnHorL
  );
};

const logicaEmails = async () => {
  let emails = (await readFileAndGetJson("emails.json")) as Array<string>;
  let persons = (await readFileAndGetJson("persons.json")) as Array<any>;

  // 2.a
  let personsEmails = persons.reduce((prev, curr) => {
    if (emails.includes(curr.email))
      prev.push({ name: curr.name, email: curr.email });
    return prev;
  }, []);
  console.log("Personas a las que se les puede enviar email", personsEmails);

  // 2.b
  let emailWithoutPerson = emails.filter(
    (e) => !persons.find((p) => p.email == e)
  );
  console.log('"Emails sin asociacion de persona', emailWithoutPerson);

  // 2.c
  let regexValidEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let emailsInvalids = emails.filter((e) => !regexValidEmail.test(e));
  console.log("Emails invalids", emailsInvalids);
};

logicaPersons();
logicaEmails();
