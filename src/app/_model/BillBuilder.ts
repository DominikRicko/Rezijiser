import { Bill } from './Bill';

export class BillBuilder{

    private identificator: number;
    private payday: string;
    private datePaid: string;
    private cost: string;
    private type: string;
    private counter: string;

    public static build(): Bill{
        const bill: Bill = {
            identificator: null,
            payday: null,
            datePaid: null,
            cost: null,
            counter: null,
            type: null
        };

        return bill;
    }

    public setIdentificator(id: number): BillBuilder{
        this.identificator = id;
        return this;
    }

    public getIdentificator(): number{
        return this.identificator;
    }

    public setPayday(payday: string): BillBuilder{
        this.payday = payday;
        return this;
    }

    public getPayday(): string{
        return this.payday;
    }

    public setDatePaid(datePaid: string): BillBuilder{
        this.datePaid = datePaid;
        return this;
    }

    public getDatePaid(): string{
        return this.datePaid;
    }

    public setType(type: string): BillBuilder{
        this.type = type;
        return this;
    }

    public getType(): string{
        return this.type;
    }

    public setCost(cost: string): BillBuilder{
        this.cost = cost;
        return this;
    }

    public getCost(): string{
        return this.cost;
    }

    public setCounter(counter: string): BillBuilder{
        this.counter = counter;
        return this;
    }

    public getCounter(): string{
        return this.counter;
    }

    public build(): Bill{
        const bill: Bill = {
            identificator: this.identificator,
            payday: this.payday,
            datePaid: this.datePaid,
            cost: this.cost,
            counter: this.counter,
            type: this.type
        };

        return bill;
    }

}
