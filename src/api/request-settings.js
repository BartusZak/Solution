// Employees
export const getEmployees = 'getEmployees';

// Projects
export const getProjects = 'getProjects';

// Quarter talks
export const editQuarterTalk = 'editQuarterTalk';
export const deleteQuaterTalk = 'deleteQuaterTalk';
export const reactivateQuaterTalk = 'reactivateQuaterTalk';

// Assignments
export const getAssignmentByEmployee = 'getAssignmentByEmployee';
export const getAssignmentByProject = 'getAssignmentByProject';

export const errorsBlackList = [

];

export const succOperationsWhiteObject = {
  getProjects: {pl: 'Projekt został pomyślnie dodany', en: 'Project has been succesfully added'},

  editQuarterTalk: {pl: 'Zaznaczona rozmowa kwartalna została pomyślnie edytowana', en: 'Marked quarter talk has been succesfully edited'},
  deleteQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na usunięty', en: 'Quarter talk status has been succesfully changed into deleted'},
  reactivateQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na aktywny', en: 'Quarter talk status has been succesfully changed into active'}
}
