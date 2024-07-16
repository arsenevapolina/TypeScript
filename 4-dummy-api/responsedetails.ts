interface IResponseFormat {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

interface IUser {
  hair: IHair;
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: EyeColor;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICrypto;
}

enum Gender {
  Male = "male",
  Female = "female",
}

enum BloodGroup {
  APlus = "A+",
  OMinus = "O-",
  ABMinus = "AB-",
  BMinus = "B-",
}

enum HairColor {
  Black = "Black",
  Blonde = "Blonde",
}

enum EyeColor {
  Amber = "Amber",
  Brown = "Brown",
  Gray = "Gray",
  Blue = "Blue",
  Green = "Green",
}

interface IHair {
  color: HairColor;
  type: string;
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface ICompany {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface ICrypto {
  coin: string;
  wallet: string;
  network: string;
}

type Address = {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

export { IResponseFormat };
