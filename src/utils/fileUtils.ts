export const blobToFile = (theBlob: Blob, fileName:string): File => {       
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}