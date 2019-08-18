const FILETYPE_EXTENSIONS = {
  Archive: [
    'zip','ZIP',
    'rar','RAR',
    '7z',
  ],
  Audio: [
    'mp3','MP3',
    'ogg',
    'wav','WAV',
    'aac','AAC',
    'au',
  ],
  SpeechToolsOutput: [
    'ctm','CTM',
  ],
  Text: [
    'txt','TXT',
  ],
}

let extensionMapping = {}

for (const [type, extensions] of Object.entries(FILETYPE_EXTENSIONS)) {
  for (const extension of extensions) {
    extensionMapping[extension] = type
  }
}

export { extensionMapping }
