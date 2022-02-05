export interface Bill {
  identificator: number;
  payday: string;
  datePaid?: string;
  cost: string;
  type?: string;
  counter?: string;
}
