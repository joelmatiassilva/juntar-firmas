export const user = state => state.user

export const steps = state => state.app.steps
export const activeStep = state => state.app.activeStepId ? state.app.steps.find(item => item._id === state.app.activeStepId) : {}

export const flows = state => state.app.flows
export const activeFlow = state => state.app.activeFlowId ? state.app.flows.find(item => item._id === state.app.activeFlowId) : {}
export const flowToEdit = state => state.app.flowToEdit

export const template = state => state.app.currentTemplate
export const templates = state => state.app.templates
export const activeTemplate = state => state.app.activeTemplateId ? state.app.templates.find(item => item._id === state.app.activeTemplateId) : {}

export const sectors = state => state.app.sectors
export const activeSector = state => state.app.activeSectorId ? state.app.sectorsOfIdGroup.find(item => item._id === state.app.activeSectorId) : {}
export const sectorsOfIdGroup = state => state.app.sectorsOfIdGroup

export const groups = state => state.app.groups
export const activeGroup = state => state.app.activeGroupId ? state.app.groups.find(item => item._id === state.app.activeGroupId) : {}

export const terminals = state => state.app.terminals
export const terminalsToOneSector = state => state.app.terminalsToOneSector
export const allTerminals = state => state.app.allTerminals
export const activeTerminal = state => state.app.activeTerminalId ? state.app.terminals.find(item => item._id === state.app.activeTerminalId) : {}

export const resultToAlert = state => state.app.resultToAlert

export const procedures = state => state.app.procedures
export const activeProcedure = state => state.app.activeProcedureId ? state.app.procedures.find(item => item._id === state.app.activeProcedureId) : {}

export const stepProcedures = state => state.app.stepProcedures
export const activeStepProcedure = state => state.app.activeStepProcedureId ? state.app.stepProcedures.find(item => item._id === state.app.activeStepProcedureId) : {}

export const errors = state => state.app.errors
export const activeError = state => state.app.activeErrorId ? state.app.errors.find(item => item._id === state.app.activeErrorId) : {}

export const organizationalUnits = state => state.app.organizationalUnits
export const activeOrganizationalUnit = state => state.app.activeOrganizationalUnitId ? state.app.organizationalUnits.find(item => item._id === state.app.activeOrganizationalUnitId) : {}

export const permits = state => state.app.permits
export const activePermit = state => state.app.activePermitId ? state.app.permits.find(item => item._id === state.app.activePermitId) : {}

export const lastPage = state => state.app.lastPage

export const infoOrganizationalUnit = state => state.app.infoOrganizationalUnit
