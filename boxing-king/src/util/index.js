
// 将 file 转换为 Image

export const fileToImage = (file) => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let img = new Image()
            img.src = fileReader.result
            resolve(img)
        }
        fileReader.onerror = (err) => {
            reject(err)
        }
        fileReader.readAsDataURL(file)
    })
}

export const dataUrlToBlob = (dataUrl) => {
    let arr = dataUrl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
