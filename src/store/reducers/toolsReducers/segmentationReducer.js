import * as actionTypes from '../../actions';

const initialState = {
    segmentEntry: [],
    audioList: [],
    txtList: [],
}

const segmentationReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DROP_AUDIO_FILES:

            let fileList = [...state.audioList, ...action.audioFiles];
           
            return {
                ...state,
                audioList: fileList,
                segmentEntry: fileList //to jest tymczasowo - pozniej to trzeba wyrzucic
            }
        case actionTypes.CHANGE_AUDIO_LIST_ORDER:

                //receiving the ids as array in custome order
                let idsOrder = action.audioIdsOrder;

                //not rearrange the audioList according to the idsOrder...
                let newAudioList = idsOrder.map(id => {
                    return (
                        Object.assign({},
                                state.audioList.find(elem => elem.id === id)
                            )
                    )
                });

                console.log(newAudioList)


                
                return {
                    ...state,
                    audioList: newAudioList,
                    segmentEntry: newAudioList //to jest tymczasowo - pozniej to trzeba wyrzucic
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

