const translations = {
  locale: "en",
  EmployeeSearcher: {
    EmployeeSearcherPlaceholder: 'start typing for searching employee...',
    EmployeeSearcherOwnersPlaceholder: 'dodaj owner...',
    Employee: 'Find employee',
    EmptyEmployeeQuery: 'There is no employees for given parameters'
  },
  DragAndDrop: {
    DroppedMessage: 'Files succesfully dropped',
    TooManyFilesError: 'Too many files dropped. Limit is '
  },
  PhaseProjectForm: {
    Step: 'Step',
    firstStepTitleForPhases: 'Populate project phase details',
    secondStepTitleForPhases: 'Populate client details for project phase',
    firstStepTitleForProjects: 'Populate project details',
    secondStepTitleForProjects: 'Populate client informations',
    name: 'name',
    description: 'description',
    startDate: 'start date',
    endDate: 'end date',
    client: 'client',
    cloud: 'cloud',
    responsiblePerson: 'responsible person',
    EmptyResponsiblePersonsInSelect: 'responsible person is not selected...'
  },
  ResponsiblePersonForm: {
    client: 'client',
    firstName: 'first name',
    lastName: 'last name',
    email: 'email adress',
    phoneNumber: 'phone number',
    modalHeaderAdd: 'Add new responsible person',
    modalHeaderEdit: 'Edit responsible person'
  },
  LoginForm: {
    EnterUsername: "Enter username",
    EnterPassword: "Enter password",
    Login: "Login",
    Forgot: "Forgot",
    Password: "password",
    CloseModalMessage:
      "Are you sure you don't want to choose prefered roles ? \nThis operation can be performed only once !"
  },
  TopBar: {
    Logout: "Logout"
  },
  LeftMenu: {
    Users: "Users",
    Employees: "Employees",
    Clients: "Clients",
    Projects: "Projects",
    Assign: "Assign",
    Stats: "Statistics",
    Skills: "Skills",
    Reports: "Reports",
    ImportCV: "Import CV",
    Info: "Info"
  },
  PreferedRoles: {
    ChooseRoles: "Choose your prefered roles",
    SavedSuccessfully: "Successfully saved selected roles",
    Save: "Save"
  },
  NotFound404: {
    PageNotFound: "Page Not Found",
    PageNotFoundText: "You don't want to be here..."
  },
  SmoothTable: {
    Search: "Search",
    DeleteFilters: "Delete filters",
    ShowDeleted: "Deleted",
    Deleted: "Deleted",
    ShowNotActivated: "Not activated",
    ShowActivated: "Activated",
    ShowAll: "All",
    Today: "Today",
    NoDataOrResults: "No data or results given",
    Reports: "Reports",
    EmployeeIsNotActivated: "Employee is not activated!"
  },
  StatsContainer: {
    DevLocalization: "Employees Localization",
    EmployeesWithoutProjects: "Employees Without Projects",
    Without: "Without",
    With: "With",
    ActiveProjects: "Active Projects",
    Active: "Active",
    Archive: "Archive",
    EmployeesFTE: "Employees FTE",
    UnUsed: "UnUsed",
    Used: "Used",
    Remote: "REMOTE",
    Others: "OTHERS"
  },
  UsersList: {
    Add: "Add",
    Name: "Name",
    Surname: "Surname",
    Email: "Email",
    Phone: "Phone",
    Date: "Date",
    userId: "User Id",
    ReactivateUserImperativus: "Reactivate user",
    ReactivateUserInfinitive: "Reactivate user",
    UserReactivated: "User has been reactivated",
    DeleteUserImperativus: "Delete user",
    DeleteUserInfinitive: "Delete user",
    DeleteUserRequestImperativus: "Delete user request",
    DeleteUserRequestInfinitive: "Delete user request",
    UserDeleted: "User has been deleted",
    UserRequestDeleted: "Account request has been deleted",
    EditUserImperativus: "Edit user",
    DeleteEdit: "Options",
    DeleteAdd: "Options",
    AddUserWhenRequestImperativus: "Add user"
  },
  ClientsContainer: {
    Add: "Add",
    Name: "Name",
    Options: "Options",
    DeleteClient: "Delete Client",
    EditClient: "Edit Client",
    ReactivateClient: "Reactivate Client",
    SaveClient: "Save Client",
    ClientRemoved: "Client has been removed.",
    ClientReactivated: "Client has beed reactivated.",
    Removing: "You are about to remove client",
    RemovingCloud: "You are about to remove cloud",
    ReactivatingCloud: "You are about to reactivate cloud",
    Reactivating: "You are about to reactivate client",
    CloudReactivated: "Cloud has been reactivated",
    Search: "Search",
    ClientsNotFound: "Clients Not Found.",
    Activated: "Activated",
    NotActivated: "Not Activated",
    ClientCloudsList: "Client's Clouds List",
    AddCloud: "Add Cloud",
    CloudsNotFound: "Clouds not found.",
    CloudName: "Cloud Name",
    NoClientDescription: "No Client Description.",
    CloudRemoved: "Cloud has been removed.",
    ResponsiblePersonList: "Responsible People",
    ResponsiblePersonNotFound: "Responsible People Not Found.",
    InsertCloudName: "Insert cloud name...",
    FirstName: "First Name",
    LastName: "Last Name",
    Email: "Email",
    PhoneNumber: "Phone Number",
    Insert: "Insert",
    AddResponsiblePerson: "Add Responsible Person",
    ResponsiblePersonAdded: "Responsible Person has been added.",
    CloudAdded: "Cloud has been added.",
    EditCloud: "Edit Cloud",
    Save: "Save",
    CloudEdited: "Cloud's details has been edited.",
    ResponsiblePersonEdited: "Responsible Person's details has been edited.",
    EditResponsiblePerson: "Edit Responsible Person",
    ReactivatingResponsiblePerson: "Reactivate Responsible Person",
    ResponsiblePersonReactivated: "Responsible Person has beed reactivated.",
    RemovingResponsiblePerson: "Removing Responsible Person",
    ResponsiblePersonRemoved: "Responsible Person has been removed.",
    showDeleted: "Show Deleted",
    showActive: "Show Active",
    NewInputLabel: "Input Label",
    NewInputValue: "Input Value",
    AddInput: "Add Input"
  },
  AddClient: {
    Add: "Add",
    Edit: "Edit",
    Client: "Client",
    ClientName: "Client Name",
    ClientDescription: "Client Description",
    ClientAddedSuccess: "Client has been added.",
    ClientEditedSuccess: "Client's details has been modified.",
    Save: "Save"
  },
  ProjectsList: {
    Add: "Add",
    DeleteOwnerFuture:
      "Delete {{ownerFullName}} as owner of project {{projectName}}",
    OwnerHasBeenDeleted: "Owner has been deleted",
    ChangeSkillSettingsFuture:
      "Change skill settings of project #{{projectId}}",
    SettingsHaveBeenSaved: "Settings have been saved",
    ProjectName: "Project name",
    Client: "Client",
    StartDate: "Start date",
    EndDate: "End date",
    Status: "Status",
    Activated: "Active",
    NotActivated: "Not activated",
    Closed: "Closed",
    Deleted: "Deleted",
    SelectStatus: "Select status...",
    CloseProjectImperativus: "Close project",
    CloseProjectInfinitive: "Close project",
    ProjectClosed: "Project has been closed",
    ReactivateProjectImperativus: "Reactivate project",
    ReactivateProjectInfinitive: "Reactivate project",
    ProjectReactivated: "Project has been reactivated",
    DeleteProjectImperativus: "Delete project",
    DeleteProjectInfinitive: "Delete project",
    ProjectDeleted: "Project has been deleted",
    EditProject: "Edit project",
    DeactivateDeleteEdit: "Deactivate/Delete/Edit",
    SeeMore: "See more"
  },
  EmployeesList: {
    Name: "Name",
    Surname: "Surname",
    Position: "Position",
    Location: "Location",
    Status: "Status",
    AccountActive: "Active",
    AccountInactive: "Inactive",
    SelectStatus: "Select Status...",
    DownloadCV: "Download CV",
    Options: "Options",
    ActivateEmployee: "Activate Employee",
    EmployeeHasBeenActivated: "Employee has been Activated.",
    ActivateEmployeeInfinitive: "Activate Employee",
    DeleteEmployee: "Delete Employee",
    DeleteEmployeeInfinitive: "Delete Employee",
    EmployeeHasBeenDeleted: "Employee has been Deleted.",
    DownloadEmployeeCVInWordFormat: "Download CV.docx",
    DownloadEmployeeCVInPdfFormat: "Download CV.pdf"
  },
  EmployeeDetails: {
    Close: "Close",
    Edit: "Edit",
    EmployeeDetails: "Employee's Details",
    Active: "Active",
    NotActive: "Not Active",
    Deleted: "Deleted",
    Details: "Details",
    Localization: "Localization",
    Phone: "Phone",
    Superiors: "Superiors",
    EmailMissing: "Email is missing.",
    RoleMissing: "Role is missing.",
    NoLevel: "No level",
    CallSkype: "Call Skype",
    CallBusinessSkype: "Call Business Skype",
    InsertSkypeId: "Insert SkypeId",
    SkypeIdUpdated: "SkypeId has been updated.",
    Activate: "Activate",
    BeforeYouChangeStatus: "Before you change Employee's status!",
    BeforeYouChangeStatusContent: `Changing the status of an employee consists in assigning him the time dimension work and experience level. Remember that you can also change its status to
      Removed
     which will block it editing options. Changing the status to
      Active
     will allow you to re-change the data of this employee.`,
    Save: "Save",
    Delete: "Delete",
    ActiveProjects: "Active Projects",
    Skills: "Skills",
    Missing: "Missing",
    Assignments: "Assignments",
    ProfilePhoto: "Profile photo",
    EmployeeCV: "Employee's CV",
    DownloadEmployeeCVInWordFormat: "Download CV.docx",
    DownloadEmployeeCVInPdfFormat: "Download CV.pdf"
  },
  EmployeeOnBoards: {
    Client: "Client",
    ClientPlaceHolder: "Choose client",
    Cloud: "Cloud",
    CloudPlaceHolder: "Choose cloud",
    StartDate: "Start Date",
    EndDate: "End Date",
    Options: "Options",
    Edit: "Edit",
    EditingTitle: "Editing employee onBoard",
    AddingTitle: "Adding employee onBoard",
    Delete: "Delete",
    Deleting: "Deleting",
    DeleteAgreed: 'Are you sure you want to delete onBoard',
    SuccesfullDelete: "Succesfully deleted",
    Add: "Add",
    Update: "Update",
    Title: "OnBoard",
    AddingError: "An error occurred while trying to add employee onboard",
    UpdatingError: "An error occurred while trying to update employee onboard",
    ShowAll: 'Show all',
    ShowActive: 'Show only active assignments'
  },
  List: {
    Search: "type to search...",
    Sort: "Sort",
    Filters: "Filters",
    NoResults: "No results",
    Default: "Default"
  },
  Quaters: {
    Add: "Add",
    Active: "Active",
    NotActive: "Not Active",
    QuarterTalk: "Quarter Talk",
    QuaterTalks: "Quarter Talks",
    Missing: "Missing",
    Deleted: "Deleted",
    Delete: "Delete",
    DeleteQuarterTalkConfirmation:
      "You are about to delete Quarter Talk. Are you sure?",
    OperationSuccessful: "Operation Succes",
    QuarterTalkAdded: "Quarter Talk has been added",
    QuarterTalkActivated: "Quarter Talk has been activated",
    QuarterTalkHeader: "Quarter talk panel",
    QuarterTalkSubHeader: "current watched user",
    PlanQuarter: "Plan quarter",
    AddQuarter: "Add quarter",
    ClearHistory: "Clear history",
    EmptyQuarterTalk: "This quarter talk doesn't have any answers",
    SuccDeletedQuarter: "This quarter talk has been removed",
    SpeechState: "The course of the conversation",
    Next: "Next",
    Employee: "Employee",
    Deny: "Deny",
    MakeSureYouWantDeleteQuarter:
      "You are sure you want to delete this quarter?",
    AddQuarterTalk: "Add quarter talk",
    Options: "Options",
    AddQuestion: "Add question",
    QuestionMenage: "Question manager",
    ChooseQuestionHeader: "Choose question to use",
    CheckAll: "Check all",
    UncheckAll: "Uncheck all",
    Start: "Start",
    SuccDeleteQuestion: "The question was successfully removed",
    Date: "Date",
    Quarter: "Quarter",
    Question: "question",
    QuestionContent: "Question content...",
    ChooseOrSelectQuarter: "choose or select quarter...",
    SuccAddedQuarter: "Quarter talk has been added",
    QuarterItemSubHeader: "carried out",
    Reactivate: "Reactivate",
    Conduct: "conduct",
    Year: "Year",
    PlannedDate: "Planned date",
    PlannedHour: "Planned hour",
    YearHolder: "select or type planned year...",
    Language: "en",
    Minutes: "minutes",
    QuarterTalksDetails: "Quarter talk details",
    Plan: "Plan",
    SuccPlannedQuarter: "Talks were planned successfully",
    SugestedHours: "Sugested hours",
    From: "from",
    To: "to",
    OccupiedDates: "Occupied dates",
    CallCalendar: "Call calendar",
    Choosen: "Choosen",
    NotChoosen: "Not choosen",
    Deleted: "Deleted",
    NotDeleted: "Not deleted",
    Empty: "Empty quarter talks",
    startQuarterTranslation: "Fill answers",
    NoAnswers: "This conversation has not yet taken",
    Populate: "Populate quarter",
    ConfirmQuestions: "Confirm questions",
    ForQuarter: "for",
    In: "in",
    InYear: "year",
    DoneQuarter: "This conversation was carried out",
    IncomingQuarter: "This conversation will only take place",
    PeopleToTalkWith: "Person to talk with",
    DownloadTalkInDoc: "Download talk in .doc",
    QuarterTalkDate: "Quarter talk date",
    PlannedQuarterTalkDate: "Planned quarter talk date",
    DeleteMarked: "Delete marked",
    MakeSureYouWantDeleteQuestion: "Are you sure you want to delete the selected questions ?",
    DeletedQuarter: 'This quarter talk is in delete state',
  },
  EditQuestion: {
    EditingHeaderModal: 'You are currently editing selected question',
    Confirm: 'Confirm',
    Answer: 'Answer',
    InsertAnswer: 'fill answer for question'
  },
  EmployeeSkills: {
    Add: "Add",
    Skills: "Skills",
    NoSkills: "No skills",
    ManageSkills: "Manage skills",
    Find: "Find",
    ShowAdded: "Show added",
    ShowAll: "Show All",
    NoDataToShow: "No data to show",
    NewSkills: "New skills",
    ApproveChanges: "Approve changes",
    SkillsAddedSuccessfull: "Skills added successfull",
    Search: "Search",
    SearchInAdded: "search in added...",
    SearchInAll: "search in all..."
  },
  EmployeeTable: {
    AddedBy: "Added by",
    Project: "Project",
    Role: "Role",
    StartDate: "Start date",
    EndDate: "End date",
    EmptyAssignments: "Empty assignments"
  },
  ActivateCheckbox: {
    ShowDeleted: "Show Deleted"
  },
  EmployeeCertificates: {
    Add: "Add",
    Name: "Name",
    Description: "Description",
    Date: "Date",
    Options: "Options",
    Edit: "Edit",
    Delete: "Delete",
    Title: "Certyficates",
    Deleting: "Delete certificate",
    SuccesfullDelete: "Succesfully deleted certificate"
  },
  EmployeeAddCertificate: {
    Add: "Add",
    Name: "Certificate name",
    Description: "Description",
    Date: "Date",
    CertificateAddedSuccessfully: "Certyficate added succesfully",
    CertificateEditedSuccessfully: "Certificate edited succesfully",
    AddingCertificate: "Adding certyficate",
    EditingCertificate: "Editing certyficate",
    Edit: "Save"
  },
  EmployeeFeedbacks: {
    Feedbacks: "Feedbacks",
    Author: "Author",
    Content: "Content",
    Project: "Project",
    Client: "Client"
  },
  ShareEmployeesModal: {
    ShareEmployees: "Share employees",
    ChooseEmployeesToShare: "Choose employees to share",
    ChooseLeader: "Choose leader",
    SharedEmployees: "Shared employees",
    Search: "Search",
    StopSharing: "Stop sharing",
    Employees: "Employees",
    ShareTeam: "Share team",
    Share: "Share"
  },
  ImportCVContainer: {
    Name: "Name",
    Size: "Size",
    LastModifiedDate: "Last Modified Date",
    Actions: "Actions",
    SelectFiles: "Select Files",
    DropHere: "Drop files here to import. Or use the button bellow.",
    OnlyDocx: "Allowed are only .docx files.",
    Import: "Import",
    Imported: "Imported",
    Result: "Import Result"
  },
  Confirmation: {
    YouAreAboutTo: "You are about to",
    AreYouSure: "Are you sure?",
    ActionRollbackWarning: "Rollback might be not available",
    Confirm: "Confirm"
  },
  ResultBlock: {
    OperationSuccessful: "Operation executed successfully",
    BadRequest: "Bad request",
    Unauthorized: "Unauthorized",
    Forbidden: "Forbidden",
    NotFound: "Not found",
    NotAcceptable: "Not acceptable",
    InternalServerError: "Internal server error",
    NotImplemented: "Functionality not implemented yet",
    ServiceUnavailable: "Service is currently unavailable",
    GatewayTimeout: "Timeout",
    UnexpectedError: "Unexpected error occured",
    ErrorModel: "Error Model",
    Error: "Error",
    OK: ""
  },
  AddProjectOwner: {
    Owners: "Owners",
    AddProjectOwner: "Add project's owner",
    ChooseAnOwner: "Choose project's owner",
    EmployeeNotFound: "Employee Not Found",
    ProjectOwnerHasBeenAdded: "Owner has been added successfully",
    Delete: "Delete",
    Cancel: "Cancel",
    DeleteYourselfeMessage:
      "Are you sure you want to delete yourself from project owners list ?"
  },
  AddProjectScreen: {
    AddProject: "Add Project",
    Next: "Next",
    Insert: "Insert",
    Name: "Name",
    Surname: "Surname",
    Phone: "Phone",
    SelectPeopleToContact: "Select People to contact",
    ProjectHasBeenAdded: "Project has been added. You are redirected...",
    Back: "Back",
    ResponsiblePerson: "Responsible Person",
    ProjectName: "Project name",
    CannotContainSpecial: "Project name cannot contain special characters",
    Description: "Description",
    Client: "Client",
    Cloud: "Choose cloud",
    ContactPerson: "Responsible person",
    StartDate: "Start date",
    EndDate: "End Date",
    ProjectAddedSuccessfully: "Project added successfully",
    Add: "Add",
    CloudPlaceHolder: "Add own cloud or choose from list",
    ClientPlaceHolder: "Add own client or choose from list"
  },
  ProjectDetailsBlock: {
    EditProjectData: "Edit project data",
    ProjectName: "Project name",
    CannotContainSpecial: "Project name cannot contain special characters",
    Description: "Description",
    Client: "Client",
    ContactPerson: "Responsible person",
    StartDate: "Start date",
    EndDate: "End date",
    Today: "Today",
    Confirm: "Confirm",
    Next: "Next",
    Send: "Send",
    Back: "Back",
    ResponsiblePerson: "Responsible person",
    ProjectHasBeenEdited: "Project was correctly edited",
    Name: "Name",
    InsertProjectName: "insert project name...",
    Description: "Description",
    InsertProjectDescription: "insert project's description...",
    Client: "Client",
    InsertClientName: "Insert client's name or select one from list",
    Cloud: "Select a cloud",
    ChooseCloud: "Insert cloud's name or select one from list",
    StartDate: "Start date",
    InsertStartDate: "insert project's start date...",
    EndDate: "End date",
    InsertEndDate: "insert project's end date...",
    InsertEmail: "insert email address...",
    FirstName: "First name",
    InsertFirstName: "insert first name...",
    LastName: "Last name",
    InsertLastName: "insert last name...",
    PhoneNumber: "Phone number",
    InsertPhoneNumber: "insert phone number...",
    ResponsiblePerson: "Responsible person",
    AddContactPerson: "Add or choose contact person",
    ContactPerson: "Add or choose contact person",
    ProjectHasBeenEdited: "Project has been succesfully edited"
  },
  ProjectDetails: {
    ParentName: "Main project",
    EmptyProjectPhases: "This project has no phases yet",
    ProjectPhaseHasBeenAdded: "Project phase has been added. Redirecting...",
    Back: "Back",
    Phone: "Phone number",
    ContactPerson: "Choose or add contact person",
    Insert: "Insert",
    ProjectName: "Project phase name",
    AddProjectPhase: "Add project phase",
    Next: "Next",
    Status: "Status",
    ProjectPhases: "Project phases",
    GeneralInfo: "Overview",
    LoadingProjectMessage: "Loading project data",
    ResponsiblePerson: "Responsible person",
    SkillsRequired: "Skills required for this project",
    ShowAllAssignments: "Show all assignments",
    Name: "Name",
    Role: "Role",
    Experience: "Experience",
    Position: "Position",
    StartDate: "Start date",
    EndDate: "End date",
    AssignmentStartDate: "Assignment start date",
    InsertAssignmentStartDate: "insert assignment's start date...",
    AssignmentEndDate: "Assignment end date",
    InsertAssignmentEndDate: "insert assignment's end date...",
    Responsibilities: "Responsibilities",
    AddResponsibility: "add responsibility...",
    Employee: "Employee",
    FindEmployee: "find employee...",
    RoleInProject: "Role in project",
    SelectRoleInProject: "select or insert role in project...",
    Deleted: "Deleted",
    Closed: "Closed",
    Inactive: "Inactive",
    InactiveTitle: "Project is inacitve because it has not yet started",
    Active: "Active",
    DeleteProject: "Delete project",
    ProjectTeam: "Project team",
    EmptyProjectTeam: "This project has no employees yet",
    ConfirmDeleteProject: "Are you sure you want to delete this project?",
    Delete: "Delete",
    AddEmployee: "Add employee to the project",
    EditEmployee: "Edit employee assignment",
    FTE: "FTE percentage",
    EmployeeAdded: "Successfully added the employee to the project",
    AssignmentSaved: "Successfully edited employee assignment",
    AssignmentDeleted: "Successfully deleted employee assignment",
    EditProject: "Edit project",
    ActivateProject: "Activate project",
    Close: "Close",
    FirstName: "First name",
    Surname: "Surname",
    Client: "Client",
    Email: "Email",
    PhoneNumber: "Phone number",
    FullName: "Full name",
    EstimatedEndDate: "Estimated end date",
    Description: "Description",
    Owners: "Owners",
    Add: "Add",
    Save: "Save",
    ToFill: "To Fill",
    ToFillEmail: "to@fill.com",
    Share: "Share",
    Cancel: "Cancel",
    DeleteEmpAssignment : "Are you sure you want to delete employee \"",
    FromProject : "\" assignment ?",
    EmployeeFreeCapacity: "Employee with free capacity",
    EmployeeFreeCapacityAndSkills: "Employees with free capacity and skills matched to this project",
    CapacityLeft: "Capacity left",
    Capacity: "Capacity",
    NoSkillsToShow: "No skills to show"
  },
  ProjectRowUnfurl: {
    OwnersList: "Owners",
    ProjectId: "Project ID",
    Description: "Description",
    CurrentlyNoSkillsAssigned: "Currently no skills assigned",
    EditSkills: "Edit skills",
    Add: "Add",
    Save: "Save",
    More: "More"
  },
  SkillsSelect: {
    AddNew: "Add new",
    AddingEllipsis: "Adding",
    Error: "Error"
  },
  EditUserDetails: {
    Confirm: "Confirm",
    RolesSuccessfullyEdited: "Roles edited successfully",
    UserSuccesfullyAdded: "Successfully added new user"
  },
  StageOne: {
    SearchAD: "Search Active Directory",
    UserNotFoundInAD: "User not found in AD",
    Next: "Next",
    HasAccount: "Account already exists for that User",
    SelectUser: "Select User"
  },
  StageTwo: {
    AddRoles: "Add roles!",
    Back: "Back",
    UserAddedSuccessfully: "User added successfully",
    Add: "Add"
  },
  UserDetailsBlock: {
    UserData: "User's details",
    Name: "Name",
    Surname: "Surname",
    Email: "Email",
    Phone: "Phone",
    Roles: "Roles",
    EditRoles: "Edit roles"
  },
  UserRoleAssigner: {
    Developer: "Developer",
    TeamLeader: "Team Leader",
    HumanResources: "Human Resources",
    Tradesman: "Tradesman",
    Administrator: "Administrator"
  },
  LoggedInUser: {
    LoggedIn: "Logged in"
  },
  ProjectDetailContainer: {
    Active: "Active",
    Inactive: "Inactive",
    EditProject: "Edit project",
    Overview: "Overview",
    Client: "Client",
    Deleted: "Deleted",
    StartDate: "Start date",
    EstimatedEndDate: "Estimated end date",
    Name: "Name",
    Surname: "Surname",
    PhoneNumber: "Phone #",
    Email: "Email",
    Owners: "Owners",
    Description: "Description",
    Cancel: "Cancel",
    Add: "Add",
    Save: "Save",
    Edit: "Edit",
    DeleteOwnerFuture:
      "Delete {{ownerFullName}} as owner of project {{projectName}}",
    OwnerHasBeenDeleted: "Owner has been deleted",
    ResponsiblePerson: "Responsible person",
    Yes: "Yes",
    No: "No",
    Deactivate: "Deactivate",
    Delete: "Delete",
    Close: "Close",
    Reactivate: "Reactivate",
    CloseProjectInfinitive: "Close project",
    ProjectClosed: "Project has been closed",
    DeleteProjectInfinitive: "Delete project",
    ProjectDeleted: "Project has been deleted",
    ReactivateProjectInfinitive: "Reactivate project",
    ProjectReactivated: "Project has been reactivated"
  },
  TeamMember: {
    AssignedCapacity: "Assigned capacity",
    ProjectRole: "Project role",
    Seniority: "Seniority",
    AddedBy: "Added by",
    ResponsibleFor: "Responsible for",
    Begun: "Begun",
    Ends: "Ends"
  },
  SkillsContainer: {
    Deletion: "Deletion",
    Info1:
      "Deletion will be permanent, removing entries from the database and all places where referenced.",
    Info2: "Rollback of this action is not available.",
    SuccessfullyDeleted: "Successfully deleted skill",
    AllSkills: "All skills",
    AddSkillName: "Enter new skill name",
    EnterSkillName: "Enter skill name...",
    SkillExists: "That skill already exists",
    SkillName: "Skill name"
  },
  SkillList: {
    DeleteSkill: "Delete skill",
    EditSkill: "Edit skill",
    DeleteSkillQuestion: "Are you sure that you want to delete that skill ",
    SuccessfullyDeletedSkill: "Successfully deleted skill",
    SkillLenghtError: "Skill name can't be longer than 100 characters",
    NoResults: "No matching results"
  },
  FileInput: {
    ChooseFile: "Choose File",
    WrongFileType: "Wrong File Type",
    FileIsTooBig: "File is too big",
    WrongAspectRatio: "Image has wrong aspect ratio"
  },
  SideProgressBar: {
    Notifications: "Notifications",
    SuccessFullyGeneratedReport: "Successfully generated report",
    Read: "Read",
    Unread: "Unread",
    Hour: "hour",
    Hours: "hours",
    HoursPl: "hours",
    Ago: "ago",
    Day: "day",
    Days: "days",
    Month: "Month",
    Months: "months",
    MonthsPl: "months",
    Year: "Year",
    Years: "years",
    OneMinute: "One minute",
    Minutes: "minutes",
    MinutesPl: "minutes",
    MarkAllAsRead: "Mark all as read",
    DeleteAll: "Delete all",
    NoNotifications: "You don't have any notifications.",
    Tack: "Change position of notification icon on screen"
  },
  Skills: {
    SaveChanges: "Save changes",
    InsertSkillName: "insert skill name...",
    AddSkillToProject: "Add skill to project",
    HideAdded: "Hide added",
    ShowAdded: "Show added",
    NoResults: "No results for this query",
    Confirm: "Confirm",
    ThatProjectDoesntHavaAnySkillAssigned:
      "That project doesn't have any skills assigned.",
    AddSkillsToProject: "Add skills to project"
  },
  Skill: {
    SkillName: "Skill name",
    YearsOfExperience: "Years of experience",
    PutYear: "Add year",
    PopYear: "Pop year",
    DeleteSkill: "Delete skill",
    ChangedThings: "This row has been changed",
    SkillLevel: "Skill level"
  },
  ProjectTeamTable: {
    Add: "Add",
    Feedback: "Feedback",
    AddFeedbackPlaceholder: "add feedback about employee...",
    EditFeedbackPlaceholder: "edit feedback about employee...",
    StartDate: "Start date",
    EndDate: "End date",
    AddedBy: "Added to project by",
    Responsibilities: "Responsibilities",
    AddFeedback: "Add feedback about employee",
    EditFeedback: "Edit feedback about employee",
    FeedbacksList: "Feedback about employee",
    DeleteFeedback: "Delete feedback",
    FeedbackDeleted: "Feedback deleted",
    AreYouSureYouWantToDeleteFeedback: "Are you sure you want to delete feedback?",
    Delete: "Delete",
    Cancel: "Cancel",
    NoFeedbacks: "No feedback about this employee",
    ShowFeedbacks: "Show feedback",
    AddFeedbackShort: "Add feedback",
    EditFeedbackShort: "Edit feedback",
    FeedbackAdded: "Successfully added feedback",
    FeedbackEdited: "Successfully edited feedback",
    Author: "Author",
    DaysAgo: "days ago",
    OnDate: "on",
    GoIntoEmployeeDetails: "Go to employee details",
    DeleteAssignment: "Delete assignment",
    EditAssignment: "Edit assignment"
  },
  ShareProject: {
    ShareProject: "Share project",
    Confirm: "Confirm",
    ChangesSaved: "Changes has been saved",
    NotFound: "Not found",
    SelectPersons: "Select persons",
    Shared: "Shared"
  },
  Info: {
    YourRoleIs: "Your role is",
    RoleError: "Ups, something went wrong...",
    SearchingUsersAccounts: "Searching Users Accounts",
    EditingUsersRoles: "Editing Users Roles",
    SearchingAD: "Searching Employees in Active Directory",
    AddingUser: "Adding Users Accounts",
    ReactivatingUser: "Reactivating Users Accounts",
    DeletingUserRequest: "Deleting Users Accounts Requests",
    DeletingUser: "Deleting Users Accounts",

    SearchingProjects: "Searching Projects",
    AddingProject: "Adding Project",
    EditingProject: "Editing Project",
    DeletingProjectOwners: "Deleting Project Owners",
    ClosingProject: "Closing Project",
    ReactivatingProject: "Reactivating Project",
    SettingProjectSkills: "Setting Project Skills",
    DeletingProject: "Deleting Projekt",
    GettingSuggestedEmployees: "Getting Suggested Employees",

    GettingListOfClients: "Getting List of Clients",
    AddingClient: "Adding Client",
    DeletingClient: "Deleting Client",
    EditingClient: "Editing Client",
    ReactivatingClient: "Reactivating Client",

    GettingEmployeeAssignments: "Getting Employee Assignments",
    GettingProjectAssignments: "Getting ProjectAssignments",
    AddingAssignment: "Adding Assignment",
    EditingAssignment: "Editing Assignment",
    DeletingAssignment: "Deleting Assignment",

    GettingEmployeeCertificates: "Getting Employee Certificate",
    EditingCertificate: "Editing Employee Certificate",
    AddingCertificate: "Adding Certificate",
    DeletingCertificate: "Deleting Certificate",

    AddingCloud: "Adding Cloud",
    EditingCloud: "Editing Cloud",
    DeletingCloud: "Deleting Cloud",
    ReactivatingCloud: "Reactivating Cloud",

    ImportingCV: "Importing CV",

    AddingEducation: "Adding Education",
    EditingEducation: "Editing Education",
    DeletingEducation: "Deleting Education",
  },
  ReportsCloudView: {
    LoadingAccountDataPrompt: "Cloud data is loading right now. Please wait...",
    ActualPath: "Actual path",
    AddFolder: "Add folder",
    Create: "Create",
    WriteFolderName: "write folder name...",
    Back: "Back",
    ThisFolderIsEmpty: "This folder is empty...",
    Refresh: "Refresh",
    AreYouSureToDelete: "You are sure you want to delete the folder",
    Delete: "Delete",
    Deny: "Deny",
    SuccCreatedFolder: "Folder succesfully created",
    SuccEditedFolder: "Folder succesfully edited",
    SuccDeletedFolder: "Folder succesfully deleted",
    SuccAddedFile: "File succesfully added"
  },
  FilePicker: {
    SelectFileToAdd: "select file to add...",
    Send: "Send"
  },
  Files: {
    Sort: "Sort",
    Confirm: "Confirm",
    Deny: "Deny",
    OpenFolder: "Open this folder",
    DeleteFolder: "Delete this folder",
    Edit: "Edit",
    ChooseFolderForLink: "Generate share link",
    Type: "Type",
    Size: "Size",
    Path: "Path",
    Open: "Open",
    ChooseFolderToGenerate: "Choose this folder to generate report"
  },
  ReportsContainer: {
    FavReports: "Favorite reports",
    LastReports: "Last reports",
    Back: "Back"
  },
  ReportsNavigation: {
    FirstPage: "Choose teams",
    SecondPage: "Select the cloud in which the report will be generated",
    GDrivePage: "Select folder on Google Drive cloud to generate report",
    OneDrivePage: "Select folder on One Drive cloud to generate report",
    SearchTeamPlaceholder: "type team name...",
    Generate: "Generate",
    Teams: "Teams",
    Folders: "Folders",
    AddItems: "added",
    FoundItems: "found",
    First: "first",
    Secondly: "second",
    LastStepName: "last",
    StepName: "step of generating reports"
  },
  ReportsContent: {
    NotFoundResults: "No result for this keyword",
    AllTeams: "List of teams",
    NumberOfEmployees: "Number of employees"
  },
  ReportsPresets: {
    Page: "Page",
    SelectThisTeams: "Select",
    Delete: "Delete",
    Team: "Team"
  },
  GenerateReportModal: {
    GenerateReportModalTitle: "Choose number of pages for every team",
    Delete: "Delete",
    Employees: "Number of employees",
    Identity: "Identity",
    Name: "Name",
    CreationDate: "Creation date",
    Size: "Size",
    Path: "Path",
    ClickHere: "Click here",
    FirstInfo:
      "For generating report you must firstly select foolder in One Drive cloud or Google Drive cloud",
    SecondInfo: "if you want continue",
    EmployeesInDay: "Only employees avaible in",
    AddFav: "Add this report to favorite",
    SuccGenReport: "Succesfully generated report",
    GenReport: "Generate report",
    CurrentCreatedLink: "The link has been created",
    CreatingLink: "Link for share is generating",
    CreatedLink: "Created link for sharing",
    OpenIn: "Open in",
    Open: "Open"
  }
};

export default translations;
