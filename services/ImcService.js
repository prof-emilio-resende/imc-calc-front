class ImcService {
    constructor() {
        this.hostname = "http://localhost:8080";
    }

    calculate(person) {
        var path = "/imc/calculate";
    
        return HttpClient
            .post(this.hostname, path, person.toObject())
            .then(rawObj => {
                console.log(rawObj);
                console.log("-----------");
                console.log(this);
                person.imc = rawObj.imc;
                person.imcDescription = rawObj.imcDescription;
                return person;
            });
    }
}