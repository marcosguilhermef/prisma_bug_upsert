import { PrismaClient, Teste } from "@prisma/client";
import { generate } from "./func";
let arr : Pick<Teste, "name" | "type"> [] = [];
let $prisma : PrismaClient | undefined = new PrismaClient({log: ['info'],}) ;
let parse = 10000
for( let a = 0; a < parse; a++  ){
    if(a == 0){
        console.log("[start for]")
    }

    arr.push(generate())

    if(parse -1 == a){
        console.log("[stop for]")
    }
    //console.log(`objeto criado: ${arr[a].name}`)
}
/* 

** funciona corretamente. Porém, é mais lento **
async function generateData(){
        let i = 0
    
        for(let e of arr){
            if(i == 0){
                console.log("[start map]")
            }
        
            await $prisma.teste.upsert(
                {
                    where: {
                        name: e.name
                    },
                    update: {
                        name: e.name,
                        type: e.type
                    },
                    create: {
                        name: e.name,
                        type: e.type
                    }
        
                }
            )

            if(arr.length-1 == i){
                console.log("[stop map]")
            }
            i++;
        }
    
} */

/*
    * Gera uso exagerado de memoria
    * Gera chama desconect antes do fim
    * Não consegue aguardar fim do map
*/

/* async function generateData(){
    await arr.map( async (e : Pick<Teste, "name" | "type">,  i: number) => {
        if(i == 0){
            console.log("[start map]")
        }
        await $prisma.teste.upsert(
            {
                where: {
                    name: e.name
                },
                update: {
                    name: e.name,
                    type: e.type
                },
                create: {
                    name: e.name,
                    type: e.type
                }
    
            }
        )
        if(arr.length-1 == i){
            console.log("[stop map]")
        }
    })
}
 */

function generateData(){
    return Promise.all(arr.map( async (e : Pick<Teste, "name" | "type">,  i: number) => {
        if(i == 0){
            console.log("[start map]")
        }
        
        if(arr.length-1 == i){
            console.log("[stop map]")
        }

        return await $prisma?.teste.upsert(
            {
                where: {
                    name: e.name
                },
                update: {
                    name: e.name,
                    type: e.type
                },
                create: {
                    name: e.name,
                    type: e.type
                }
    
            }
        )
    }))
}

var data : any = generateData()
data.then( (e: Teste[]) => {
    $prisma?.$disconnect().then(() => console.log("disconected"));
    $prisma = undefined;
    data = undefined;
    arr.length = 0;
} ) 


setTimeout( () => {
    console.log("--------------[FIM]--------------")
    process.exit(0)
} , 500000)