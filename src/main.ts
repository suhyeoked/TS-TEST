const a:any = "123"; /*any는 어떤 타입이 들어가도 괜찮음*/
const u:unknown = 123;

const any:any = 1;
const boo:boolean = a;

const tuple: [string , number , boolean] = ["1" , 1 , a]
const users : [number , string , boolean][] 
= [[1, "neo" , true], [2,'ebde' , false]]

function hello(msg: string): void{
    console.log(`Hello ${msg}`);
}

const hi : void = hello("word")


