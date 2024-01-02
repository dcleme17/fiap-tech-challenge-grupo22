export class Cliente {

    constructor (nome: string, cpf: string, email: string) {
        this.nome = nome
        this.cpf = cpf
        this.email = email
    }

    private id!: string
    private nome: string
    private cpf: string
    private email: string
    private dataCadastro!: Date


    public getNome(): string {
        return this.nome
    }
    public getCpf(): string {
        return this.cpf
    }
    public getEmail(): string {
        return this.email
    }
    public getId(): string | undefined{
        return this.id
    }

    public setId(id: string): Cliente {
        this.id = id
        return this
    }

    public getDataCadastro(): Date | undefined {
        return this.dataCadastro
    }

    public setDataCadastro(dataCadastro: any): Cliente {
        this.dataCadastro = dataCadastro
        return this
    }

    /**
     * 
     * @param comparable 
     * @returns boolean
     */
    public equals(comparable: Cliente): boolean{
        /** Não gostei de fazer essa lógica, deve ter alguma forma menos custosa */
        const comparable1: any = JSON.parse(JSON.stringify(this))
        const comparable2: any = JSON.parse(JSON.stringify(comparable))

        delete comparable1.id
        delete comparable2.id
        delete comparable1.dataCadastro
        delete comparable2.dataCadastro

        return JSON.stringify(comparable1).toLowerCase() === JSON.stringify(comparable2).toLowerCase()
    }
}