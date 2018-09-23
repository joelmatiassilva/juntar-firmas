export const TOGGLE_LOADING = (state) => {
  state.app.callingAPI = !state.app.callingAPI
}

export const TOGGLE_SEARCHING = (state) => {
  state.app.searching = (state.app.searching === '') ? 'loading' : ''
}

export const UPDATE_USER = (state, user) => {
  state.user = user
}

export const UPDATE_AUTH = (state, auth) => {
  state.auth = auth
}

export const CLEAR_ALL_DATA = (state) => {
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null

  // User
  state.user.name = ''
  state.user.email = ''
  state.user.messages = []
  state.user.notifications = []
  state.user.tasks = []
  state.user.organizationalUnit = {}
}

// FLOW
export const ACTIVE_FLOW = (state, id) => {
  state.app.activeFlowId = id
}

export const CLEAR_FLOW_TO_EDIT = (state) => {
  state.app.flowToEdit = []
}

export const ADD_FLOW_TO_EDIT = (state, {item, steps}) => {
  Object.assign(item, {steps: steps})
  Object.assign(state.app.flowToEdit, item)
}

export const GET_FLOW_LIST = (state, list) => {
  state.app.flows = list.map(item => Object.assign(item, {steps: []}))
}

export const ADD_FLOW = (state, item) => {
  Object.assign(item, {steps: []})
  state.app.flows.push(item)
}

export const ADD_STEPS_2_FLOW = (state, {id, value}) => {
  const objIndex = state.app.flows.findIndex(el => el._id === id)
  state.app.flows[objIndex].steps = value
}

export const CLEAR_FLOW_STEPS = (state, id) => {
  const objIndex = state.app.flows.findIndex(el => el._id === id)
  state.app.flows[objIndex].steps = []
}

export const DELETE_FLOW = (state, id) => {
  state.app.flows = state.app.flows.filter(el => id !== el._id)
}

export const EDIT_FLOW = (state, {id, value}) => {
  const objIndex = state.app.flows.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.flows[objIndex], value)
  }
}

// STEP
export const ACTIVE_STEP = (state, id) => {
  state.app.activeStepId = id
}

export const GET_STEP_LIST = (state, list) => {
  state.app.steps = list
}

export const ADD_STEP = (state, item) => {
  state.app.steps.push(item)
}

export const DELETE_STEP = (state, id) => {
  state.app.steps = state.app.steps.filter(el => id !== el._id)
}

export const EDIT_STEP = (state, {id, value}) => {
  const objIndex = state.app.steps.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.steps[objIndex], value)
  }
}

export const CLEAR_STEPS = (state) => {
  state.app.steps = []
}

// TEMPLATE
export const SAVE_TEMPLATE = (state, template) => {
  state.app.currentTemplate = template
}

export const GET_TEMPLATE_LIST = (state, list) => {
  state.app.templates = list
}

export const ADD_TEMPLATE = (state, item) => {
  state.app.templates.push(item)
}

export const ACTIVE_TEMPLATE = (state, id) => {
  state.app.activeTemplateId = id
}

// SECTOR

export const GET_SECTOR_LIST = (state, list) => {
  state.app.sectors = list
}

export const GET_LIST_SECTORS_OF_IDGROUP = (state, list) => {
  state.app.sectorsOfIdGroup = list
}

export const ADD_SECTOR = (state, item) => {
  state.app.sectors.push(item)
}

export const ADD_SECTORS_OF_IDGROUP = (state, item) => {
  state.app.sectorsOfIdGroup.push(item)
}

export const EDIT_SECTOR = (state, {id, value}) => {
  const objIndex = state.app.sectorsOfIdGroup.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.sectorsOfIdGroup[objIndex], value)
  }
}

export const EDIT_SECTOR_OF_IDGROUP = (state, {id, value}) => {
  const objIndex = state.app.sectors.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.sectors[objIndex], value)
  }
}

export const ACTIVE_SECTOR = (state, id) => {
  state.app.activeSectorId = id
}

export const DELETE_SECTOR = (state, id) => {
  state.app.sectors = state.app.sectors.filter(el => id !== el._id)
}

export const DELETE_SECTOR_OF_IDGROUP = (state, id) => {
  state.app.sectorsOfIdGroup = state.app.sectorsOfIdGroup.filter(el => id !== el._id)
}

// GROUP
export const SAVE_GROUP = (state, group) => {
  state.app.group = group
}

export const GET_GROUP_LIST = (state, list) => {
  state.app.groups = list
}

export const ADD_GROUP = (state, item) => {
  Object.assign(item, {sectors: []})
  state.app.groups.push(item)
}

export const EDIT_GROUP = (state, {id, value}) => {
  const objIndex = state.app.groups.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.groups[objIndex], value)
  }
}

export const ACTIVE_GROUP = (state, id) => {
  state.app.activeGroupId = id
}

export const DELETE_GROUP = (state, id) => {
  state.app.groups = state.app.groups.filter(el => id !== el._id)
}

// TERMINALS
export const DELETE_TERMINAL = (state, idTerminal) => {
  state.app.terminalsToOneSector = state.app.terminalsToOneSector.filter(el => idTerminal !== el._id)
  state.app.terminals = state.app.terminals.filter(el => idTerminal !== el._id)
}

export const ACTIVE_TERMINAL = (state, id) => {
  state.app.activeTerminalId = id
}

export const ADD_TERMINAL = (state, item) => {
  state.app.terminals.push(item)
}

export const ADD_TERMINAL_TO_ONE_SECTOR = (state, item) => {
  state.app.terminalsToOneSector.push(item)
}

export const EDIT_TERMINAL = (state, {id, value}) => {
  const objIndex = state.app.terminals.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.terminals[objIndex], value)
  }
}

export const EDIT_TERMINAL_TO_ONE_SECTOR = (state, {id, value}) => {
  const index = state.app.terminalsToOneSector.findIndex(el => el._id === id)
  if (index !== -1) {
    Object.assign(state.app.terminalsToOneSector[index], value)
  }
}

export const CLEAR_TERMINALS = (state) => {
  state.app.terminals = []
}

export const CLEAR_TERMINALS_TO_ONE_SECTOR = (state) => {
  state.app.terminalsToOneSector = []
}

export const GET_TERMINAL_LIST = (state, list) => {
  state.app.terminals = list
}

export const GET_TERMINAL_LIST_TO_ONE_SECTOR = (state, list) => {
  state.app.terminalsToOneSector = list
}

// PROCEDURE
export const SAVE_PROCEDURE = (state, procedure) => {
  state.app.procedure = procedure
}

export const GET_PROCEDURE_LIST = (state, list) => {
  state.app.procedures = list
}

export const ADD_PROCEDURE = (state, item) => {
  state.app.procedures.push(item)
}

export const EDIT_PROCEDURE = (state, {id, value}) => {
  const objIndex = state.app.procedures.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.procedures[objIndex], value)
  }
}

export const ACTIVE_PROCEDURE = (state, id) => {
  state.app.activeProcedureId = id
}

export const DELETE_PROCEDURE = (state, id) => {
  state.app.procedures = state.app.procedures.filter(el => id !== el._id)
}

// STEPPROCEDURE
export const SAVE_STEPPROCEDURE = (state, stepProcedure) => {
  state.app.stepProcedure = stepProcedure
}

export const GET_STEPPROCEDURE_LIST = (state, list) => {
  state.app.stepProcedures = list
}

export const ADD_STEPPROCEDURE = (state, item) => {
  state.app.stepProcedures.push(item)
}

export const EDIT_STEPPROCEDURE = (state, {id, value}) => {
  const objIndex = state.app.stepProcedures.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.stepProcedures[objIndex], value)
  }
}

export const ACTIVE_STEPPROCEDURE = (state, id) => {
  state.app.activeStepProcedureId = id
}

export const DELETE_STEPPROCEDURE = (state, id) => {
  state.app.stepProcedures = state.app.stepProcedures.filter(el => id !== el._id)
}

// ERROR
export const SAVE_ERROR = (state, error) => {
  state.app.error = error
}

export const GET_ERROR_LIST = (state, list) => {
  state.app.errors = list
}

export const ADD_ERROR = (state, item) => {
  state.app.errors.push(item)
}

export const EDIT_ERROR = (state, {id, value}) => {
  const objIndex = state.app.errors.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.errors[objIndex], value)
  }
}

export const ACTIVE_ERROR = (state, id) => {
  state.app.activeErrorId = id
}

// ORGANIZATIONALUNIT
export const SAVE_ORGANIZATIONALUNIT = (state, organizationalUnit) => {
  state.app.organizationalUnit = organizationalUnit
}

export const GET_ORGANIZATIONALUNIT_LIST = (state, list) => {
  state.app.organizationalUnits = list
}

export const ADD_ORGANIZATIONALUNIT = (state, item) => {
  state.app.organizationalUnits.push(item)
}

export const EDIT_ORGANIZATIONALUNIT = (state, {id, value}) => {
  const objIndex = state.app.organizationalUnits.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.organizationalUnits[objIndex], value)
  }
}

export const ACTIVE_ORGANIZATIONALUNIT = (state, id) => {
  state.app.activeOrganizationalUnitId = id
}

export const DELETE_ORGANIZATIONALUNIT = (state, id) => {
  state.app.organizationalUnits = state.app.organizationalUnits.filter(el => id !== el._id)
}

// PERMIT
export const SAVE_PERMIT = (state, permit) => {
  state.app.permit = permit
}

export const GET_PERMIT_LIST = (state, list) => {
  state.app.permits = list
}

export const ADD_PERMIT = (state, item) => {
  state.app.permits.push(item)
}

export const EDIT_PERMIT = (state, {id, value}) => {
  const objIndex = state.app.permits.findIndex(el => el._id === id)
  if (objIndex !== -1) {
    Object.assign(state.app.permits[objIndex], value)
  }
}

export const ACTIVE_PERMIT = (state, id) => {
  state.app.activeErrorId = id
}

// OTHERS
export const ADD_RESULT_TO_ALERT = (state, result) => {
  state.app.resultToAlert = result
}

export const CLEAR_RESULT_TO_ALERT = (state) => {
  state.app.resultToAlert = {}
}

export const LAST_PAGE = (state, page) => {
  state.app.lastPage = page
}

export const ADD_INFO_ORGANIZATIONAL_UNIT = (state, result) => {
  state.app.infoOrganizationalUnit = result
}

export const CLEAR_INFO_ORGANIZATIONAL_UNIT = (state) => {
  state.app.infoOrganizationalUnit = undefined
}
