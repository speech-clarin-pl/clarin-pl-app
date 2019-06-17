export {} from './repo';

export {
    projectChoice,
    duplicateProject,
    shareProject,
    deleteProject,
    editName,
    getProjectsList,
    getProjectsListFailed,
    addNewProject,
    addNewProjectDone,
    addNewProjectActionFailed,
    openModal,
    closeModal
} from './projectsList';

export {
    initProject,
    openModalProject,
    closeModalProject
} from './project';

export {} from './home';

export {
    dropFiles
} from './toolActions/recognition';

export {
    dropAudioFiles,
    dropTxtFiles,
    changeAudioListOrder,
    changeTxtListOrder
} from './toolActions/segmentation';






