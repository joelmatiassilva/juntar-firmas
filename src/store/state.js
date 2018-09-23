export const STORAGE_KEY = 'nero-admin-ui'

let initialState = {}

// Local storage sync state
if (localStorage.getItem(STORAGE_KEY)) {
  initialState = JSON.parse(localStorage.getItem(STORAGE_KEY))
} else {
  initialState = {
    auth: {
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null
    },
    user: {
      name: '',
      email: '',
      messages: [{1: 'test', 2: 'test'}],
      notifications: [],
      tasks: [],
      groups: []
    }
  }
}

// Other state (not synced in local storage)
initialState.app = {
  callingAPI: false,
  searching: '',
  steps: [],
  activeStepId: {},
  flows: [],
  activeFlowId: {},
  flowToEdit: {},
  terminalToEdit: {},
  currentTemplate: {},
  activeTemplateId: {},
  templates: [],
  groups: [],
  activeGroupId: {},
  sectors: [],
  activeSectorId: {},
  sectorsOfIdGroup: [],
  terminals: [],
  activeTerminalId: {},
  terminalsToOneSector: [],
  allTerminals: [],
  procedures: [],
  activeProcedureId: {},
  stepProcedures: [],
  activeStepProcedureId: {},
  resultToAlert: '',
  errors: [],
  activeErrorId: {},
  organizationalUnits: [],
  activeOrganizationalUnitId: {},
  permits: [],
  activePermitId: {},
  lastPage: '',
  infoOrganizationalUnit: undefined
}

export const state = initialState
