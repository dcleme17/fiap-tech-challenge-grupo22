import { MongoDB } from "domains/suporte/infra/database/mongodb";
import { IPagamento } from "domains/pagamento/core/applications/ports/pagamento.port";
import { Pagamento } from "domains/pagamento/core/entities/pagamento";
import { PagamentoVersao } from "domains/pagamento/core/entities/pagamento.versao";
import { ObjectId } from "mongodb";

export class PagamentoDatabase extends MongoDB implements IPagamento {

    private COLLECTION = 'pagamentos'
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }

    async criar(pagamento: Pagamento): Promise<PagamentoVersao | null > {
        
        const pagamentoRef = await this.getCollection('lanchonete', 'pagamentos').then();
        
        const result = await pagamentoRef.insertOne({
             nome : pagamento.getNome()
            ,cpf : pagamento.getCpf()  
            ,email : pagamento.getEmail()
            ,valor : pagamento.getValor()
            ,parcelamento : pagamento.getParcelamento()
            ,meio : pagamento.getMeio()
            ,identificadorExterno: pagamento.getIdentificadorExterno()
            ,data : pagamento.getData()
            ,parceiroNegocio : pagamento.getParceiroNegocio()
            ,metadata: pagamento.getMetadata()
            ,status : pagamento.getStatus()           
        });

        return new PagamentoVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }

    async buscaUltimaVersao(identificadorExterno: string): Promise<Pagamento | null>{

        const ref = await this.getCollection('lanchonete', this.COLLECTION).then()

        const cursor = ref.find( 
            { $and: 
                [ {
                    identificadorExterno, 
                    versionado: { $exists: false } }
                ] 
            } , {
                sort: {_id: "desc"}
            }
        ).limit(1)

        let data

        for await (const doc of cursor) {
            data = doc
        }

        if (!data) {
            return null
        }

        const pagamento =  new Pagamento(
            data?.cpf,
            data?.nome,
            data?.email,
            data?.valor,
            data?.parcelamento,
            data?.meio,
            data?.identificadorExterno
        )

        pagamento.setVersao(new PagamentoVersao(
            data?._id?.toString(), 
            data?._id?.getTimestamp()
            )
        )
        pagamento.setMetadata(data?.metadata)
        pagamento.setParceiroNegocio(data?.parceroNegocio)
        pagamento.setStatus(data?.status)

        return pagamento
    }   
    
    async versiona(pagamento: Pagamento): Promise<boolean | null> {

        const pedidoRef = await this.getCollection('lanchonete', this.COLLECTION).then();

        const response = await pedidoRef.updateOne({
            _id: new ObjectId(pagamento.getVersao()?.versao)
        }, {
            $set: { versionado: true }
        }, { upsert: true }
        )
    
        return response.modifiedCount == 1;
    }    
}