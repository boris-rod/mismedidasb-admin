export interface UserDetails {
    id: number;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    language: string;
    imc: number;
    kCal: number;
    age: number;
    sex: string;
    height: number;
    weight: number;
    healthMeasuresLastUpdate: Date;
    valueMeasuresLastUpdate: Date;
    wellnessMeasuresLastUpdate: Date;
    lastPlanedEat: Date;
}