export class Cliente {

    constructor (nome: string, cpf: string, email: string) {
        this.nome = nome
        this.cpf = cpf
        this.email = email
    }

    private nome: string
    private cpf: string
    private email: string

    public getNome(): string {
        return this.nome
    }
    public getCpf(): string {
        return this.cpf
    }
    public getEmail(): string {
        return this.email
    }
    public equals(comparable: Cliente){
        return JSON.stringify(this) === JSON.stringify(comparable)
    }



}