import { Teste, Type } from "@prisma/client";

export function generateName(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;

}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  
export function getType(){
    let arr : Type[]= [
        Type.ADMIN,
        Type.USER
    ]
    return arr[Math.floor(randomIntFromInterval(0,1))]
}

export function generate(){
    let user : Pick<Teste, "name" | "type">;

    user = {
        name: generateName(),
        type: getType()
    }

    return user;
}