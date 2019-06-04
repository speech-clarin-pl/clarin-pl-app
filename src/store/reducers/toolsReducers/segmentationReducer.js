import * as actionTypes from '../../actions';

const initialState = {
    segmentEntry: [],
    audioList: [],
    txtList: [],
}

const segmentationReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DROP_AUDIO_FILES:

            const AudioFileList = [...state.audioList, ...action.audioFiles];
           
            return {
                ...state,
                audioList: AudioFileList,
                segmentEntry: AudioFileList //to jest tymczasowo - pozniej to trzeba wyrzucic
            }
        case actionTypes.DROP_TXT_FILES:

            const txtFileList = [...state.txtList, ...action.txtFiles];
            
            return {
                ...state,
                txtList: txtFileList,
                segmentEntry: txtFileList //to jest tymczasowo - pozniej to trzeba wyrzucic
            }
        case actionTypes.CHANGE_AUDIO_LIST_ORDER:

                //receiving the ids as array in custome order
                const idsAudioOrder = action.audioIdsOrder;

                //not rearrange the audioList according to the idsOrder...
                let newAudioList = idsAudioOrder.map(id => {
                    return (
                        Object.assign({},
                                state.audioList.find(elem => elem.id === id)
                            )
                    )
                });

               // console.log(newAudioList)
                
                return {
                    ...state,
                    audioList: newAudioList,
                    segmentEntry: newAudioList //to jest tymczasowo - pozniej to trzeba wyrzucic
                }
        case actionTypes.CHANGE_TXT_LIST_ORDER:

                    //receiving the ids as array in custome order
                    const idsTxtOrder = action.txtIdsOrder;
    
                    //not rearrange the audioList according to the idsOrder...
                    let newTxtList = idsTxtOrder.map(id => {
                        return (
                            Object.assign({},
                                    state.txtList.find(elem => elem.id === id)
                                )
                        )
                    });
    
                   // console.log(newAudioList)
                    
                    return {
                        ...state,
                        txtList: newTxtList,
                        segmentEntry: newTxtList //to jest tymczasowo - pozniej to trzeba wyrzucic
                    }
        case actionTypes.INIT_BATCH_SEGMENTATION:
            return {

            }
        case actionTypes.INIT_FILE_SEGMENTATION:
            return {

            }
    }

    return state;
}

export default segmentationReducer;

