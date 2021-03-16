export default class ImcService {
  constructor() {
    this.hostname = "http://localhost:8080";
  }

  async calculate(person) {
    var path = "/imc/calculate";

    const { default: HttpClient } = await import('../http/HttpClient.js');

    return HttpClient.post(this.hostname, path, person.toObject()).then(
      (rawObj) => {
        console.log(rawObj);
        console.log("-----------");
        console.log(this);
        person.imc = rawObj.imc;
        person.imcDescription = rawObj.imcDescription;
        return person;
      }
    );
  }

  async getImcTable() {
    var path = "/imc/table";

    const { default: HttpClient } = await import('../http/HttpClient.js');

    return HttpClient.get(this.hostname, path)
      .then((rawObj) =>
        Object.keys(rawObj).map((key) => {
          return {
            minValue: key,
            description: rawObj[key],
          };
        })
      )
      .catch((err) => console.error("oh, well ... I dont know what to say."));
  }
}
