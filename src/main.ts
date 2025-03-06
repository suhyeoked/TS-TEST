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

/* =========================== 타입 추론 ===========================*/

// let num = 12;
// num = "hello world"; //오류나오는데 이유는 num = 12를 해서 num에서 자연스럽게 number 타입이 들어가 다른 타입으로 재할당이 불가능 => 타입 추론이라 함
// 따로 타입 추가할 필요가 사라짐

let num = 12;

function add(a :number , b:number = 2 /*b:number = 2 를 b = 2 로해도 상관없음 => 타입 추론*/): number/*이것도 타입추론에 따라서 안해도 됨*/{
    return a + b
}
/*타입을 굳이 하나하나 다 쓸 이유가 없음 => 타입 추론이 있기 때문
하나하나해도 상관은 없지만 가독성 떨어짐 */







/*=========================== 타입 단언 ===========================*/
// 단언 - 주저하지 아니하고 딱 잘라 말함

// 단언 키워드 - as
// Non-null 단언 연산자 - !

// 1)
const el = document.querySelector('body') /* as HTMLBodyElement */ //document.querySelector 는 요소를 찾는데 요소를 찾지 못하면 null를 반환 
//as HTMLBodyElement 를 통해 HTMLBodyElement라고 단언
el!.textContent = "hi~!~!~"
//!를 사용해 ! 앞에 있는 el이 null이 아니라는 것을 뜻함

//1번에서는 html안에 body가 당연히 있어야 하고 모두가 알고 있기 때문에 !를 써도 문제가 되지 않는다

// 1-1)
const el1 = document.querySelector(".title")
if(el1){
    el1.textContent = "hello world"
}
// el1이 있을 때만 나오기 때문에 따로 ts를 사용하지 않고 js내에서 사용 할 수 있다

// 2) 
function getNumber(x: number | null | undefined){
    if(x){
        return Number(x!.toFixed(2))
    }
    //return Number(x!/*as number*/.toFixed(2)) // toFixed 메서드는 숫자데이터에서만 사용 가능 그래서 null과 undefined으로는 타입지정이 안돼 오류 발생 (toFixed 메서드는 소수점 단위처리할 때 사용 ex) toFixed(1)은 소수점 첫 번째 자리까지 출력)
//!는 null이나 undefined 아니라는 것을 말함
} 


getNumber(3.1415926535);
getNumber(null); // null 데이터가 들어갈 수는 있지만 가능하지가 않음 이유 - x를 이미 number 타입으로 지정을 해서 null이 들어가면 오류 발생

// 3)
function getValue(x: string | number , isNumber : boolean){
    if(isNumber) {
        return Number((x as number).toFixed(2))
    } // 여기서는 !는 사용하지 않음 이유 - 아까 말했듯이 !는 null이나 undefined 아니라는 것을 말하는데 여기는 타입이 number , string 두개이기 때문
    return (x as string).toUpperCase()
}
getValue("hello world" , false)
getValue(3.1415926535 , true)

//할당 당언
let num1!:number
console.log(num1)

num1 = 123

/*=========================== 타입 단언 ===========================*/