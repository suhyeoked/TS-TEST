2025.02.20

ts

const a : any = 1 // any는 어떤 값이나 들어갈 수 있음
const a : unknown = 1 // unknown은 any와 같이 어떤 값이나 들어 갈 수 있다.
any와 unknown의 차이점으로는 
any는 어떤 동작이든 할 수 있지만 unknown은 어떤 동작도 허용하지 않는다.
any는 아예 타입이 검사되지 않기 때문에 타입스크립트를 사용하는 이유가 사라짐
그래서 타입을 정제해야하는 unknown을 쓰는 것을 권장