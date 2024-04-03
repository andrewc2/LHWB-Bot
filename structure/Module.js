export default class Module {
  constructor(id, options) {
    const { category = 'default' } = options ?? {};

    this.id = id;
    this.categoryID = category;
    this.category = null;
    this.filepath = null;
    this.client = null;
    this.handler = null;
  }

  toString() {
    return this.id;
  }
}
