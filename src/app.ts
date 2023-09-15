import { Bike } from "./bike";
import { User } from "./user";
import crypto from 'crypto'
import { getDistance } from 'geolib';

export class App {
    users: User[] = []
    bikes: Bike[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    AutenticarUsuario(user: User, help: number, email?: string, password?: string): string | void {
        //help = 1 - login; = 0 - signup
        if(!help){
            return this.SignUp(user)
        }
        else {
            return this.LogIn(user, email, password)
        }
    }

    SignUp(user: User): string | void{
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                // throw new Error('Duplicate user. Please use another email or log in')
                console.log('Duplicate user. Please use another email or log in')
                return 
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        console.log ('Usuario ' + user.name + ' cadastrado')
        return newId
    }

    LogIn(user: User, email: string, password: string){
        for (const rUser of this.users) {
            if (email === user.email) {
                if(password === user.password)
                    console.log ("Usuario autenticado")
                    return
            }
        }
        // throw new Error('Tente novamente. Email e/ou senha incorretos')
        console.log('Tente novamente. Email e/ou senha incorretos')
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, possivel: boolean): void {
        if(possivel){
            possivel = false
            console.log('Bike alugada')
        } 
        else{
            console.log('Bike indisponível, alugue outra bike')
        }
    }

    returnBike(bike: Bike, userEmail: string, diaInicio: Date, diaRetorno: Date): number {
        // data que começou, que devolveu, valor da diaria
        // const today = new Date()
        let valor 
        valor = (diaRetorno.getTime() / (1000*60*60*24) - diaInicio.getTime() / (1000*60*60*24)) * bike.diaria
        return valor
    }


    listUsers() : void{
        let a = 0
        for (const rUser of this.users) {
            a +=1
            console.log("Nº", a, rUser)
        }
    }

    listBikes() : void{
        let a = 0
        for (const rBike of this.bikes) {
            a +=1
            console.log("Nº", a, rBike)
        }
    }

    atualizar_localizacao(bike: Bike, latitudeDestino: number, longitudeDestino: number){

        if(latitudeDestino === 20.5201 && longitudeDestino === 48.4032 ) console.log ("A bike está na loja.")
        //a loja fica na região de sp
        else{
            bike.localizacao.latitude = latitudeDestino
            bike.localizacao.longitude = longitudeDestino
            console.log("localização atualizada")
        }
    }

    localizarBicicleta(user: User, bike: Bike){
    
        let lat1 = bike.localizacao.latitude 
        let long1 = bike.localizacao.longitude
        const local_loja = { latitude: 20.5201, longitude: 48.4032 };
        const pos_bike = { latitude: lat1, longitude: long1 };
        const distancia = getDistance(local_loja, pos_bike)/1000;
          console.log("A bike está a " + distancia + " km da loja")      
        }
        
    }