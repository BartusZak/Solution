//Assignments
export const assignEmployeeToProject = 'assignEmployeeToProject';

// Employees
export const getEmployees = 'getEmployees';
export const getClientsSlim = 'getClientsSlim';

// Projects
export const getProject = 'getProject';
export const addProject = 'addProject';
export const editProject = 'editProject';
export const addProjectPhase = 'addProjectPhase';
export const reactivateProject = 'reactivateProject';
export const closeProject = 'closeProject';
export const deleteProject = 'deleteProject';
export const addOwnerToProject = 'addOwnerToProject';
export const editSkillsInProject = 'editSkillsInProject';

// Reponsible person
export const createResponsiblePerson = 'createResponsiblePerson';
export const editResponsiblePerson = 'editResponsiblePerson';
// Skills
export const loadAllSkills = 'loadAllSkills';
// Quarter talks
export const editQuarterTalk = 'editQuarterTalk';
export const deleteQuaterTalk = 'deleteQuaterTalk';
export const reactivateQuaterTalk = 'reactivateQuaterTalk';
export const errorsBlackList = [

];

export const succOperationsWhiteObject = {
  // Assignments
  assignEmployeeToProject: { pl: 'Pracownik został pomyślnie przypisany do projektu', en: 'Employee has been succesfully assigned into project'},

  // Projects
  addProject: {pl: 'Projekt został pomyślnie dodany', en: 'Project has been succesfully added'},
  editProject: {pl: 'Projekt został pomyślnie edytowany', en: 'Project has been succesfully modified'},
  addProjectPhase: {pl: 'Faza projektu została pomyślnie stworzona', en: 'Project phase has been succesfully created'},
  reactivateProject: {pl: 'Projekt został pomyślnie aktywowany', en: 'Project has been succesfully activated'},
  closeProject: {pl: 'Projekt został pomyślnie zamknięty', en: 'Project has been succesfully closed'},
  deleteProject: {pl: 'Projekt został pomyślnie usunięty', en: 'Project has been succesfully deleted'},
  addOwnerToProject: {pl: 'Dodano noweg właściciela', en: 'New owner has been added'},
  editSkillsInProject: {pl: 'Umiejętności projektu zostały zmienione', en: 'Skills is project has been changed'},

  // Reponsible person
  createResponsiblePerson: {pl: 'Osoba odpowiedzialna została pomyślnie dodana', en: 'Responsible person has been succesfully added'},
  editResponsiblePerson: {pl: 'Pomyślnie edytowano dane osoby odpowiedzialnej', en: 'Responsible person data has been succesfully edited'},

  // Quarter talks
  editQuarterTalk: {pl: 'Zaznaczona rozmowa kwartalna została pomyślnie edytowana', en: 'Marked quarter talk has been succesfully edited'},
  deleteQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na usunięty', en: 'Quarter talk status has been succesfully changed into deleted'},
  reactivateQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na aktywny', en: 'Quarter talk status has been succesfully changed into active'}
}
