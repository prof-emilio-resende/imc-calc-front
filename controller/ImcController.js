class ImcController {
    constructor() {
        this.service = new ImcService();
    }

    async calculateImc(person) {
        var response = await this.service.calculate(person);
        
        document
            .querySelector("#imc")
            .innerHTML = `<strong>${response.imc} - ${response.imcDescription}</strong>`;
    }
}