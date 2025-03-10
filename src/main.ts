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





/*=========================== 타입 별칭 =========================== */

type TypeA = string
type TypeB = string | number | boolean
type User4 = {
    name : string
    age : number
    isValid : boolean
} | [string , number , boolean]

const userA: User4 = {
    name : 'Neo' ,
    age : 85 ,
    isValid : true
}

const userB : User4 = ['Evan' , 36 , false]

function someFunc(param : TypeB) : TypeA {
    switch (typeof param) {
        case "string":
            return param.toUpperCase()
        case "number" :
            return param.toFixed(2)
        default:
            return "Boolean!"
    }
}


// type과 interface의 차이점
// type은 할당연산자(=) 필요


// type과 interface은 기능적인 부분에서는 차이가 없음
// 어떤 방식을 쓰던 상관은 없어 개인적인 취향에 맞춰 사용하면 됨
// 하지만 interface 권장함

type TypeUser = {
    name : string 
    age : number 
    isValid : boolean
}
interface InterfaceUser {
    name : string
    age : number 
    isValid : boolean
}

const heropy4 : InterfaceUser = {
    name : "Heropy",
    age : 85 ,
    isValid : true
}





/*=========================== 타입 별칭 =========================== */




/*=========================== 함수 - 명시적 this =========================== */

interface Cat {
    name : string
    age : number
}


const cat : Cat = {
    name : "Lucy" ,
    age : 3
}

// function hello1(message : string) {
//     console.log(`Hello ${this.name} , ${message}`)
// }
// 이렇게 하면 에러는 안나지만 this를 사용하는 것이 부적합함

function hello1(this : Cat ,message : string) {
    console.log(`Hello ${this.name} , ${message}`)
}
// 이렇게 하면 this는 Cat이라는 객체 데이터가 될 것이라고 명시적으로 표현함


hello1.call(cat  , 'You are pretty awesome!')




/*=========================== 함수 - 명시적 this =========================== */





/*=========================== 함수 - 오버로딩(Oveloading) =========================== */

// 1)
function add2 (a:string , b : string) {
    return a + b
}

function add3 (a:number , b : number) {
    return a + b
}

add2('hello', 'world~!')
add3(1,2)
add2('hello~!~!' , 2)
add3('hello~!~!' , 2)

// 2)
function add4(a:string , b : string) :string // 타입 선언 1
function add4(a:number , b : number) :number // 타입 선언 2
function add4(a:any , b : any) { //함수를 구현하는 부분
    // any가 있는 이유는 타입 선언 1 , 타입 선언 2 모두가 들어갈 수 있도록 하기 위해
    return a + b
}

add4('hello', 'world~!')
add4(1,2)
add4('hello', 2)
// 오류가 나는 이유는 a가 문자열이면 b도 문자열이여야 됨
add4(2,'hello')
// 오류가 나는 이유는 a가 숫자열이면 b도 숫자열이여야 됨
// 위에 function add4 를 보면 됨



/*=========================== 함수 - 오버로딩(Oveloading) =========================== */




/*=========================== 클래스 =========================== */
// 접근 제이자 (Access Modifiers)
// public - 어디서나 자유롭게 접근 가능, 클래스 바디에서 생략 가능
// protected - 나와 파상된 후손 클래스 내에서 접근 가능
// private - 내 클래스에서만 접근 가능

// 속성뿐만 아니라 메서드에서도 사용 가능


class UserA1 {
    // public first : string = ''
    // protected last : string = ''
    // private age : number = 0
    // 초기화 해주는 코드
    constructor(
        public first : string = '' , 
        public last : string = '', 
        public age : number = 0
        //public은 바디에서만 생략가능 매개변수 안에서는 public 사용해야 함
        ){
        //constructor를 통해 매개변수 3개 선언
        
        // this.first = first
        // this.last = last
        // this.age = age
        // 매개변수에 public를 넣어주면 다시 속성에다가 값을 따로 할당할 필요가 없음
    }
    protected getAge(){
        return `${this.first} ${this.last} is ${this.age}` 
    }
}

class UserB1 extends UserA1 {
    getAge() {
        return `${this.first} ${this.last} is ${this.age}` 
    }
}

class UserC1 extends UserB1 {
    getAge() {
        return `${this.first} ${this.last} is ${this.age}` 
    }
}


const neo = new UserA1('Neo' , 'Anderson' , 102)

console.log(neo.first)
console.log(neo.last)
console.log(neo.age)




/*=========================== 클래스 =========================== */





/*=========================== 제네릭(Generic) =========================== */
// 함수

interface Obj {
    x:number
}

type Arr = [number , number]

// function toArray(a: string , b : string) : string []
// function toArray(a: number , b : number) : number []
// function toArray(a: boolean , b : boolean) : boolean []
// function toArray(a: Obj , b : Obj) : Obj []
// function toArray(a: Arr , b : Arr) : Arr []
// function toArray(a: Arr , b : Arr) : Arr []

function toArray<T>(a: T , b : T) {
    //<T>는 type 약어
    //<T>는 매개변수처럼 타입의 정보를 가지고 있음
    return [a , b]
}

console.log(
    toArray<string>('Neo' , 'Anderson'),
    //<string>를 쓰는 이유 -> 따로 타입 추론을 하지 않고 미리 적어 명시적 표현 따로 작성하지 않아도 됨
    // a인 Neo가 string타입이기 때문에 b도 같은 타입이여야 됨
    // 이유 -> a와 b가 둘다 같은 T이기 때문에 타입이 같아야함
    toArray(1,2),
    toArray(true , false) ,
    toArray({ x : 1} , {x : 2}) ,
    toArray<Arr>([1,2] , [3,4]) // number[]
)



// 클래식


class User5<P/** payload 약어 */> {
    constructor(public payload : P){}
    getPayload() {
        return this.payload
    }
}

interface UserAType {
    name : string
    age : number
    isValid : boolean
}

interface UserBType {
    name : string
    age : number
    emails : string []
}

const heropyA = new User5<UserAType>({
    name : 'Heropy' ,
    age : 85 ,
    isValid  : true
})

const neo2 = new User5<UserBType> ({
    name : 'Neo' ,
    age: 102,
    emails : ['neo@naver.com']
})


// 인터페이스 , 제약 조건(Constraints)

interface MyData<T extends string | number | boolean | number[]> {
    name : string
    value : T
}

const dataA: MyData<string> = {
    name : 'Data A' ,
    value : 'hello world'
}

const dataB: MyData<number> = {
    name : 'Data B' ,
    value : 123
}

const dataC: MyData<boolean> = {
    name : 'Data C' ,
    value : true
}

const dataD: MyData<number[]> = {
    name : 'DataD' ,
    value : [1,2,3,4]
}



/*=========================== 제네릭(Generic) =========================== */







/*=========================== 패키지 타입 선언 =========================== */

import _ from 'lodash'

const str = 'the brown fox jumps over the lazy dog.'

console.log(_.camelCase(str))
console.log(_.snakeCase(str))
console.log(_.kebabCase(str))



/*=========================== 패키지 타입 선언 =========================== */








/*=========================== 타입 가져오기 / 내보내기 =========================== */
import {getFullName , UserTs } from './user'

const heropyTs : UserTs = {
    firstName : 'Heropy' ,
    lastName : 'Park' ,
    age : 85 ,
    isValid : true
}

const fullName1 = getFullName(heropyTs)

console.log(fullName1)
console.log(heropyTs.isValid)






/*=========================== 타입 가져오기 / 내보내기 =========================== */