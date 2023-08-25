export interface Event {
  id: number;
  date: string;
  time: string;
  type: string;
  organizer1: string;
  organizer1phone: string;
  organizer2?: string;
  organizer2phone?: string;
  guests?: number;
  coatStyle: number;
  pantStyle: number;
  shirtStyle: number;
}

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  secondLastName: string;
  mobileNumber: string;
  workNumber?: string;
  licenseNumber: string;
  emailAddress: string;
  physicalAddress: Address;
  postalAddress: Address;
  customerMeasurement: CustomerMeasurement;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerMeasurement {
  coatSizeId: number;
  chestSize: number;
  coatSleeveSize: number;
  pantSizeId: number;
  waistSize: string;
  outseam: string;
  pantAdditional: string;
  shirtSizeId: number;
  shirtSleeveSize: string;
  coatAdditionalInfo: string;
}

export interface Order {
  id?: number;
  customerId: number;
  eventId: number;
  price: number;
  pickUpDate: string;
  returnDate: string;
  storeId: number;
  orderDate: string;
}

export interface Payment {
  id?: number;
  orderId: number;
  customerName: string;
  paymentAmount: number;
  amountLeft: number;
  paymentDate?: Date;
}
