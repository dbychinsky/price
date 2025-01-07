export function getIdFromUrl(url: string) {
    return url.slice(35).split('/')[0];
}