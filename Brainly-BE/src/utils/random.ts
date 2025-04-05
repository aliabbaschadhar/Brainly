export function random(num: number): string {
    let options = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let optionsLength = options.length;
    let result = '';
    for (let i = 0; i < num; i++) {
        result += options.charAt(Math.floor(Math.random() * optionsLength));
    }
    return result;
}