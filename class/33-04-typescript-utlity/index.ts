interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입 ==> ?타입
type myType1 = Partial<IProfile>;

// 2. Required 타입 ==> all 필수값
type myType2 = Required<IProfile>;

// 3. Pick 타입 ==> 픽한것만 가져온다
type myType3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type MyType4 = Omit<IProfile, "school">;

// 5. Record 타입 ==> 선택가능함
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child: eee;
child = "철수";
type fff = Record<eee, IProfile>; //Record 타입

let mykey: keyof IProfile; //keyof
mykey = "hobby";

// ============ (type vs interface) 차이: 선언병합 ===============
interface IProfile {
  candy: number;
}

let profile: Partial<IProfile> = {
  candy: 10, // 선언병합으로 추가됨
};
