export default class ViewComponent {
  constructor(element, controller, initialState = {}) {
    if (!element) throw Error("No DOM element to bind!");
    this.element = element;
    this.controller = controller;
    this.state = initialState;
  }

  paint() {
    this.element.innerHTML = this.render();
  }

  async setState(newState) {
    const oldState = Object.assign({}, this.state);

    this.state = {
      ...this.state,
      ...newState,
    };

    await this.stateChanged(oldState);
    this.paint();
  }

  async stateChanged(oldState) {
      console.log('nothing to say ...');
  }

  async update() {
    this.paint();
  }

  observe(name, obj) {
    const self = this;
    if (obj) {
      return new Proxy(obj, {
        set(target, prop, value, receiver) {
          const updated = Reflect.set(target, prop, value);
          if (updated) {
            const o = {};
            o[name] = target;
            self.setState(o);
          }

          return updated;
        },
      });
    }

    return obj;
  }
}
