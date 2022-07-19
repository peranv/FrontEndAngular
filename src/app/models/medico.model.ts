import { Hospital } from "./hospital.model";

interface _MedicoUser{
    nombre: string;
    _id: string;
    img: string;
}

export class Medico{
    constructor(
        public _id: string,
        public nombre?: string,
        public usuario?:string,
        public img?: string,
        public hospital?: Hospital
    ){}
}