// Employees
export const getEmployees = 'getEmployees';
export const getClientsSlim = 'getClientsSlim';
export const getEmployeesBySkill = 'getEmployeesBySkill';

// Projects
export const getProjects = 'getProjects';
export const addProject = 'addProject';
export const editProject = 'editProject';
export const addProjectPhase = 'addProjectPhase';

// Reponsible person
export const createResponsiblePerson = 'createResponsiblePerson';
export const editResponsiblePerson = 'editResponsiblePerson';

// Quarter talks
export const editQuarterTalk = 'editQuarterTalk';
export const deleteQuaterTalk = 'deleteQuaterTalk';
export const reactivateQuaterTalk = 'reactivateQuaterTalk';
export const getQuestions = 'getQuestions';
export const getQuarterTalkForEmployee = 'getQuarterTalkForEmployee';
export const generateQuarterTalkDoc = 'generateQuarterTalkDoc';
export const deleteQuestion = 'deleteQuestion';
export const addQuestion = 'addQuestion';
export const createQuarterTalk = 'createQuarterTalk';
export const planQuarterTalk = 'planQuarterTalk';
export const getQuarterTalksReservedDates = 'getQuarterTalksReservedDates';

// Reports
export const generateReport = 'generateReport';
export const getReportExcel = 'getReportExcel';
export const getCv = 'getCv';
export const getFeedback = 'getFeedback';
export const getTeams = 'getTeams';
export const getRecentReports = 'getRecentReports';
export const getReportZip = 'getReportZip';
export const generateCv = 'generateCv';
export const generateCvWord = 'generateCvWord';
export const unfavoriteReport = 'unfavoriteReport';

//Responsible person
export const getResponsiblePersonByClientId = 'getResponsiblePersonByClientId';
export const getByResponsiblePersonId = 'getByResponsiblePersonId'
export const editResponsiblePerson = 'editResponsiblePerson';
export const addResponsiblePerson = 'addResponsiblePerson';
export const deleteResponsiblePerson = 'deleteResponsiblePerson';
export const reactivateResponsiblePerson = 'reactivateResponsiblePerson';

//Skills
export const getAllSkills = 'getAllSkills';
export const getSkillById = 'getSkillById';
export const addSkill = 'addSkill';
export const deleteSkill = 'deleteSkill';
export const editSkill = 'editSkill';

//Stats
export const getStats = 'getStats';

//Roles
export const getAllRoles = 'getAllRoles';
export const addRole = 'addRole';
export const editRole = 'editRole';
export const deleteRole = 'deleteRole';

//Share Project
export const shareProject = 'shareProject';
export const getManagersSharedProject = 'getManagersSharedProject';
export const getAlreadySharedManagers = 'getAlreadySharedManagers';
export const cancelShareProject = 'cancelShareProject';

//Work experience
export const addWorkExperience = 'addWorkExperience';
export const getWorkExperience = 'getWorkExperience';
export const editWorkExperience = 'editWorkExperience';
export const deleteWorkExperience = 'deleteWorkExperience';
export const getWorkExperienceByEmployeeId = 'getWorkExperienceByEmployeeId';

export const errorsBlackList = [

];

export const succOperationsWhiteObject = {
  // Projects
  addProject: {pl: 'Projekt został pomyślnie dodany', en: 'Project has been succesfully added'},
  editProject: {pl: 'Projekt został pomyślnie edytowany', en: 'Project has been succesfully modified'},
  addProjectPhase: {pl: 'Faza projektu została pomyślnie stworzona', en: 'Project phase has been succesfully created'},

  // Reponsible person
  createResponsiblePerson: {pl: 'Osoba odpowiedzialna została pomyślnie dodana', en: 'Responsible person has been succesfully added'},
  editResponsiblePerson: {pl: 'Pomyślnie edytowano dane osoby odpowiedzialnej', en: 'Responsible person data has been succesfully edited'},

  // Quarter talks
  editQuarterTalk: {pl: 'Zaznaczona rozmowa kwartalna została pomyślnie edytowana', en: 'Marked quarter talk has been succesfully edited'},
  deleteQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na usunięty', en: 'Quarter talk status has been succesfully changed into deleted'},
  reactivateQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na aktywny', en: 'Quarter talk status has been succesfully changed into active'}
}
