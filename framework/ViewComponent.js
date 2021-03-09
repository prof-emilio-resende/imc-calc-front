class ViewComponent {
    constructor(element, controller, initialState={}) {
        if (!element) throw Error("No DOM element to bind!");
        this.element = element;
        this.controller = controller;
        this.state = initialState;
    }
    
    paint() {
        this.element.innerHTML = this.render();
    }

     setState(newState) {
        console.log(newState);
        console.log(this.state);
        this.state = { 
            ...this.state,
            ...newState
        };
        console.log(this.state);
        this.paint();
    }

    async update() {
        this.paint();
    }
}