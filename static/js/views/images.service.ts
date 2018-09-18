export default class imagesService {
    constructor() {}

    buildPathToImg(urlName: string): string {
        return '../img/' + urlName + '.jpg';
    }
}
