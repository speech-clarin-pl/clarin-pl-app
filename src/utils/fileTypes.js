const FILETYPE_EXTENSIONS = {
  Audio: [
    'mp3','MP3',
    'ogg', 'OGG',
    'wav','WAV',
    'flac','FLAC',
  ]
}

let extensionMapping = {}

for (const [type, extensions] of Object.entries(FILETYPE_EXTENSIONS)) {
  for (const extension of extensions) {
    extensionMapping[extension] = type
  }
}

export { extensionMapping }
