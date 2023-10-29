function separateObject(inputObj: any, keysArray: { [key: string]: any }[]): any {
    const resultObj: any = {};

    for (const keyObj of keysArray) {
        const key = Object.keys(keyObj)[0];
        const defaultValue = keyObj[key];

        if (inputObj.hasOwnProperty(key)) {
            resultObj[key] = inputObj[key];
        } else {
            resultObj[key] = defaultValue;
        }
    }

    return resultObj;
}

const inputObj = {
    user_name: 'name====',
    email: 'emailll',
    password: 'password',
    role: 0
};

const keysArray = [
    { user_name: "_" },
    { email: "_" },
    { password: "_" },
    { roleId: "_" },
    { status: "45" },
    { remember_token: "ok" }
];

const result = separateObject(inputObj, keysArray);
console.log(result);
