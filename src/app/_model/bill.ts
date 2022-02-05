export interface Bill {
  identificator: number;
  payday: Date;
  datePaid?: Date;
  cost: string;
  type?: string;
  counter?: string;
}
