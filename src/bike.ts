export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public diaria: number,
        public disponibilidade: boolean,
        public localizacao: { latitude: number, longitude: number },
        public id?: string
    ) {}
}