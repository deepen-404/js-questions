// tsc proxy.ts --lib es2015,dom && node proxy.js

type UserT = {
  fname: string;
  age: string | number;
  gender: string;
};

const user: UserT = {
  fname: 'deeepen',
  age: 21,
  gender: 'male',
};

type KeyOfUserT = keyof typeof user;

const userProxy = new Proxy(user, {
  get(target, key: KeyOfUserT, value) {
    const { age, gender, fname } = target;

    if (key === 'fname') return age;
    if (key === 'age') return gender;
    if (key === 'gender') return fname;

    Reflect.get(target, key, value);
  },

  set(target, key: KeyOfUserT, value) {
    if (key === 'age') {
      if (typeof value === 'string')
        throw new Error('String not allowed for age key');
    }
    return Reflect.set(target, key, value);
  },
});

type KeyOfUserProxyT = keyof typeof userProxy;

const { age, gender, fname } = userProxy;

function logValues() {
  for (let key in userProxy) {
    console.log(`${key}: ${userProxy[key as KeyOfUserProxyT]}`);
  }
}

logValues();

userProxy.age = 100;

logValues();

userProxy.age = 'hello';

logValues();
