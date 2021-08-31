/**
 * Converts a base64 String to a Blob. Based on {@link https://stackoverflow.com/a/16245768/8410962}
 * @param b64Data The Base64 encoded Data
 * @param contentType The Content Type
 * @param sliceSize Slice size for performance reasons
 * @example
 * b64toBlob(base64, 'application/pdf')
 */
export function b64toBlob(
    b64Data: string,
    contentType?: string,
    sliceSize = 512
): Blob {
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

    return new Blob(byteArrays, { type: contentType });
}

/**
 * Download a Blob
 * @param blob The Blob that needs to be downloaded
 * @param filename The name under which the file should be saved
 */
export function downloadBlob(blob: Blob, filename?: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    if (filename) {
        link.setAttribute('download', filename);
    }
    document.body.appendChild(link);
    link.click();
}

interface downloadOptions {
    /**
     * The filename under which the file should be saved locally
     * @example 'hello_world.pdf'
     */
    filename?: string;
    /**
     * The content type of the file
     * @example 'application/pdf'
     */
    contentType?: string;
}

/**
 * Downloads a base64 file
 * @param base64 The base64 string
 * @param options options
 */
export function downloadBase64(
    base64: string,
    options?: downloadOptions
): void {
    downloadBlob(b64toBlob(base64, options?.contentType), options?.filename);
}

/**
 * Creates an Object URL from b64 Data
 * @param b64Data The b64 Data
 * @return The Url of the blob
 */
export function createObjectURL(b64Data: string): string {
    return window.URL.createObjectURL(b64toBlob(b64Data));
}
