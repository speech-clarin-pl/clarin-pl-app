export function bytesToSize(bytes){
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'no files';
    const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

export function getExt(path){
    return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1): 'null';
}

export function getFilenameFromURL(url){
    let filename = url.substring(url.lastIndexOf('/')+1);
    return filename;
}

export function getFileKeyFromURL(url){
    //uwaga. troche nieelegancko ale tymczasowo
    //http://localhost:1234/5d1db8a1ceb24447d9cdda0c/5d5e91a7a7cb9852fe79e55c/demo_files/test.txt
    //zaczynam od 5 znalezionego backslasha
    var a=[],i=-1;
    while((i=url.indexOf('/',i+1)) >= 0) a.push(i);
    let fileKey = url.substring(a[4]+1);
    console.log(fileKey)
    return fileKey;
}