export class Util {
    static createRandomString(length: number): string {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let randomString = '';
        for (let i = 0; i < length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1);
        }
        return randomString;
    }

    static getFileNameFromUrl(url: string): string {
        let filename = ''
        for (let i = url.length - 1; i >= 0; i--) {
            if (url.charAt(i) == '/') {
                break;
            }
            filename = url.charAt(i) + filename;
        }
        
        return filename
    }
}