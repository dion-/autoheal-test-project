export class Location {
  id?: number;
  name: string;
  address: string;

  constructor(name: string, address: string, id?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
