/**
 * Converts a base64 String to a Blob. Based on {@link https://stackoverflow.com/a/16245768/8410962}
 * @param b64Data The Base64 encoded Data
 * @param contentType The Content Type
 * @param sliceSize Slice size for performance reasons
 * @example
 * b64toBlob(base64, 'application/pdf')
 */
export function b64toBlob(b64Data: string, contentType?: string, sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}
