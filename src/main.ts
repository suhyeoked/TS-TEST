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
// const el = document.querySelector('body') /* as HTMLBodyElement */ //document.querySelector 는 요소를 찾는데 요소를 찾지 못하면 null를 반환 
//as HTMLBodyElement 를 통해 HTMLBodyElement라고 단언
// el!.textContent = "hi~!~!~"
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
//!를 통해 할당을 했다라고 함
console.log(num1)

num1 = 123

/*=========================== 타입 단언 ===========================*/




/*=========================== 타입 가드 ===========================*/
// function logText(el: Element){
//     console.log(el.textContent)
// }

// const h1El = document.querySelector("h1") as HTMLHeadingElement
// logText(h1El)

// 이렇게 하면 타입스크립트에서는 오류가 나지 않지만 웹에서는 오류가 나옴 이유는 el.textContent 여기서 NULL 데이터에서 읽을려고 했기 때문
function logText(el: Element){
    console.log(el.textContent)
}

// const h1El = document.querySelector("h1")
// if(h1El){ // h1El는 h1태그가 없어 NULL를 반환 NULL은 거짓데이터이기 때문에 실행하지 않음
//     logText(h1El)
// }
// 조건을 넣어 타입 가드를 시킴
// 거짓 데이터가 아닐 때만 실행

const h1El = document.querySelector("h1") // h1태그를 찾지 못하면 NULL 반환
if(h1El instanceof HTMLHeadingElement)/*h1 태그가 없기 때문에 h1El NULL를 반환 그러면 당연히 HTMLHeadingElement가 아님 */{
    logText(h1El)
} 

function add1(val : string | number){
    let res = "Result => "
    if(typeof val === 'number'){
        res += val.toFixed(2)
    } 
    if(typeof val === 'string') {
        res += val.toUpperCase()
    }
    console.log(res)
}

add1(3.141592)
add1("hello World ~!~!")

/*=========================== 타입 가드 ===========================*/



/*=========================== 인터페이스 =========================== */

//선택적 속성 - ?
//읽기전용 속성 - readonly

// interface User {
//     name : string
//     readonly age : number 
//     // 원래는 name , age , isValid는 값이 재할당이 가능하지만
//     // readonly를 사용하면 재할당이 불가능해짐
//     isValid?: boolean 
//     // 이렇게 ?를 사용해 isValid를 선택적 속성으로 만들면 isValid는 꼭 설정하지 않아도 오류가 나지 않는다
// }
// const heropy : User = {
//     name : "Heropy" ,
//     age : 85 ,
//     isValid : true
// }
// heropy.isValid = false

// const neo: User = {
//     name : "Neo" ,
//     age : 102 ,
// }

// 함수타입 - 호출 시그니처 (Call Signature)


interface GetName {
//     (message : string): string
//     // string을 둘다 써야 하는 이유
//     // 만약 (message : string) 여기에서 string을 사용하지 않고
//     // (message): string; 이렇게 사용하면 매개변수 타입이 any타입으로 처리되고
//     // 이유는 ts는 함수의 매개변수 타입을 자동으로 추론하지 않아
//     // 혹은 (message: string); 이렇게만 사용하면
//     // 오류가 나며 인터페이스에서 함수 타입을 정의할 때는 반환 타입(: string)이 필요함
//     // 결론 : ts의 타입추론은 함수 내부 구현에서만 적용됨
//     // 인터페이스에서 함수 타입을 정의할 때는 자동 추론이 불가능해 반드시 직접 명시해야 함
    (param : string): string
    // 이렇게 해도 오류가 나지 않음
    // 왜 message가 아닌데 오류가 나지 않을까?
    // 이유는 매개변수의 갯수와 타입이 일치하면 문제가 되지 않음
    // 만약 매개변수의 갯수가 다르다면
    // ex) (param : string , hello : string): string
    // 이면 오류가 나며 message를 찾지 못함
}


// 만약 GetName interface가 없으면

interface User {
    name : string
    age : number
    // getName : (message : string) => string
    // 혹은 
    getName : (param /*파라미터인데 줄여서도 사용 가능*/ : string) => string
    // 이렇게 해도 오류가 나지 않음
    // 왜 message가 아닌데 오류가 나지 않을까?
    // 이유는 매개변수의 갯수와 타입이 일치하면 문제가 되지 않음
}

const heropy : User = {
    name : "Heropy" ,
    age : 85 ,
    getName(message : string){
        console.log(message)
        return this.name
    }
}

heropy.getName("hello~!~!")


// 인덱스 가능 타입 - 인덱스 시그니처 (Index Signature)

// 배열
interface Fruits {
    [item : number]: string
}
const fruits: Fruits = ["Apple" , "Banana" , "Cherry"]
console.log(fruits)

// 객체
interface User1 {
    [key : string] : unknown
    name : string
    age : number
}
const heropy1 : User1 = {
    name : "Heropy",
    age : 85
}

heropy1['isValid'] = true
heropy1['emails'] = ['qwerasd@naver.com' , 'test@naver.com']
console.log(heropy1)

interface Payload{
    [key:string] : unknown
}
function logValues(payload : Payload){
    for(const key in payload){
        console.log(payload[key])
    }
}

interface User2 {
    [key : string] : unknown
    name: string
    age : number
    isValid : boolean
}
const heropy2 : User2 = {
    name: "Heropy" ,
    age : 85 ,
    isValid : true
}

logValues(heropy2)


// 확장(상속)
interface UserA {
    name : string
    age : number
}

interface UserB extends UserA {
    isValid : boolean
}

const heropy3 : UserA = {
    name : "Heropy" ,
    age : 85 ,
    isValid : true 
    // UserA에는 isValid가 없기 때문에 오류
}

const neo1 : UserB = {
    name : 'Neo' ,
    age : 102 ,
    isValid : true
    // UserB는 UserA의 name과 age를 상속받았고 기존 UserB는 isValid가 있어 오류가 나지 않음
}


interface FullName {
    firstName : string
    lastName : string
}

interface FullName {
    middleName : string
    lastName : string
}

const fullName : FullName = {
    firstName : "Tomas" ,
    middleName : "Sean" ,
    lastName : "Connery"
}


/*=========================== 인터페이스 =========================== */