export default interface ProductInterface {

  get id(): string;
  get name(): string;
  get price(): number;
  changeName(name: string): void;
  changePrice(value: number): void;
}