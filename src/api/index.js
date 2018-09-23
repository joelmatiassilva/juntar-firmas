import { request } from './utils'

// USER RESOURCE
// const CURRENT_USER = '/users/current'
const LOGIN_URL = '/nero-api/login'
export const getCurrentUser = () => Promise.resolve({data: {username: 'test', email: 'test@test.com'}})
export const login = (data) => request('post', `${LOGIN_URL}`, data)
const VERIFY_TOKEN_URL = '/nero-api/verifyToken'
export const verifyToken = (data) => request('post', `${VERIFY_TOKEN_URL}`, data)
export const searchGroup = (group) => request('get', `/nero-api/searchGroup/${group}`)

// FLOW RESOURCE
const FLOW = '/flows'
const buildFlowUrl = id => `${FLOW}/${id}`
export const getFlow = (id) => request('get', buildFlowUrl(id))
export const getFlows = () => request('get', `${FLOW}`)
export const saveFlow = (flow) => request('post', `${FLOW}`, flow)
export const updateFlow = (id, flow) => request('put', buildFlowUrl(id), flow)
export const deleteFlow = (id) => request('delete', buildFlowUrl(id))

const DELETE_FIRST_STEP = '/deleteFirstStep'
const buildDeleteFirstStep = id => `${DELETE_FIRST_STEP}/${id}`
export const deleteFirstStep = (id) => request('delete', buildDeleteFirstStep(id))

// STEP RESOURCE
const STEP = '/steps'
const buildStepUrl = id => `${STEP}/${id}`
export const getStep = (id) => request('get', buildStepUrl(id))
export const getSteps = () => request('get', `${STEP}`)
export const saveStep = (step) => request('post', `${STEP}`, step)
export const updateStep = (id, step) => request('put', buildStepUrl(id), step)
export const deleteStep = (id) => request('delete', buildStepUrl(id))

const DELETE_STEPS_FROM_FLOW = '/deleteStepsFromFlow'
const buildDeleteStepsFromFlow = id => `${DELETE_STEPS_FROM_FLOW}/${id}`
export const deleteStepsFromFlow = (id) => request('delete', buildDeleteStepsFromFlow(id))

const buildFlowIDStepUrl = id => `${FLOW}/${id}${STEP}`
export const getAllStepsFromFlow = (id) => request('get', buildFlowIDStepUrl(id))

// TEMPLATE RESOURCE
const TEMPLATE = '/templates'
const buildTemplateUrl = id => `${TEMPLATE}/${id}`
export const getTemplates = () => request('get', `${TEMPLATE}`)
export const getTemplate = (id) => request('get', buildTemplateUrl(id))

// SECTOR RESOURCE
const SECTOR = '/sectors'
const buildSectorUrl = id => `${SECTOR}/${id}`
export const getSectors = () => request('get', `${SECTOR}`)
export const getSector = (id) => request('get', buildSectorUrl(id))
export const saveSector = (sector) => request('post', `${SECTOR}`, sector)
export const updateSector = (id, sector) => request('put', buildSectorUrl(id), sector)
export const deleteSector = (id) => request('delete', buildSectorUrl(id))

const GET_ALL_SECTORS_OF_IDGROUP = '/getAllSectorsOfIdGroup'
const buildGetAllSectorsOfIdGroup = id => `${SECTOR}${GET_ALL_SECTORS_OF_IDGROUP}/${id}`
export const getAllSectorsOfIdGroup = (id) => request('get', buildGetAllSectorsOfIdGroup(id))

const DELETE_TERMINAL_IN_SECTOR = '/deleteTerminalInSector'
const buildDeleteTerminalInSectorUrl = id => `${SECTOR}/${id}${DELETE_TERMINAL_IN_SECTOR}`
export const deleteTerminalInSector = (id, idTerminal) => request('put', buildDeleteTerminalInSectorUrl(id), {'idTerminal': idTerminal})

const ADD_TERMINAL_IN_SECTOR = '/addTerminalInSector'
const buildAddTerminalInSectorUrl = id => `${SECTOR}/${id}${ADD_TERMINAL_IN_SECTOR}`
export const addTerminalInSector = (id, idTerminal) => request('put', buildAddTerminalInSectorUrl(id), {'idTerminal': idTerminal})

// GROUPS RESOURCE
const GROUP = '/groups'
const buildGroupUrl = id => `${GROUP}/${id}`
export const getGroups = () => request('get', `${GROUP}`)
export const getGroup = (id) => request('get', buildGroupUrl(id))
export const saveGroup = (group) => request('post', `${GROUP}`, group)
export const updateGroup = (id, group) => request('put', buildGroupUrl(id), group)
export const deleteGroup = (id) => request('delete', buildGroupUrl(id))
const buildGetOneGroupBySectorId = sectorId => `${GROUP}/getOneGroupBySectorId/${sectorId}`
export const getOneGroupBySectorId = (sectorId) => request('get', buildGetOneGroupBySectorId(sectorId))

// TERMINALS RESOURCE
const TERMINAL = '/terminals'
const buildTerminalUrl = id => `${TERMINAL}/${id}`
export const getTerminals = () => request('get', `${TERMINAL}`)
export const getTerminal = (id) => request('get', buildTerminalUrl(id))
export const saveTerminal = (terminal) => request('post', `${TERMINAL}`, terminal)
export const updateTerminal = (id, terminal) => request('put', buildTerminalUrl(id), terminal)
export const deleteTerminal = (id) => request('delete', buildTerminalUrl(id))

const GET_ALL_TERMINALS_OF_IDSECTOR = '/getAllTerminalsOfIdSector'
const buildGetAllTerminalsOfIdSector = id => `${TERMINAL}${GET_ALL_TERMINALS_OF_IDSECTOR}/${id}`
export const getAllTerminalsOfIdSector = (id) => request('get', buildGetAllTerminalsOfIdSector(id))

const UPDATE_TERMINAL_CODE = '/updateTerminalCode'
const buildUpdateTerminalCode = id => `${TERMINAL}/${id}${UPDATE_TERMINAL_CODE}`
export const updateTerminalCode = (id) => request('put', buildUpdateTerminalCode(id), {})

// PROCEDURE RESOURCE
const PROCEDURE = '/procedures'
const buildProcedureUrl = id => `${PROCEDURE}/${id}`
export const getProcedures = () => request('get', `${PROCEDURE}`)
export const getProcedure = (id) => request('get', buildProcedureUrl(id))
export const saveProcedure = (procedure) => request('post', `${PROCEDURE}`, procedure)
export const updateProcedure = (id, procedure) => request('put', buildProcedureUrl(id), procedure)
export const deleteProcedure = (id) => request('delete', buildProcedureUrl(id))

// STEPPROCEDURES RESOURCE
const STEPPROCEDURE = '/stepprocedures'
const buildStepProcedureUrl = id => `${STEPPROCEDURE}/${id}`
export const getStepProcedures = () => request('get', `${STEPPROCEDURE}`)
export const getStepProcedure = (id) => request('get', buildStepProcedureUrl(id))
export const saveStepProcedure = (stepProcedure) => request('post', `${STEPPROCEDURE}`, stepProcedure)
export const updateStepProcedure = (id, stepProcedure) => request('put', buildStepProcedureUrl(id), stepProcedure)
export const deleteStepProcedure = (id) => request('delete', buildStepProcedureUrl(id))

// ERROR RESOURCE
const ERROR = '/errors'
const buildErrorUrl = id => `${ERROR}/${id}`
export const getErrors = () => request('get', `${ERROR}`)
export const getError = (id) => request('get', buildErrorUrl(id))
export const saveError = (error) => request('post', `${ERROR}`, error)
export const updateError = (id, error) => request('put', buildErrorUrl(id), error)
export const deleteError = (id) => request('delete', buildErrorUrl(id))

// ORGANIZATIONALUNITS RESOURCE
const ORGANIZATIONALUNITS = '/organizationalunits'
const buildOrganizationalUnitUrl = id => `${ORGANIZATIONALUNITS}/${id}`
export const getOrganizationalUnits = () => request('get', `${ORGANIZATIONALUNITS}`)
export const getOrganizationalUnit = (id) => request('get', buildOrganizationalUnitUrl(id))
export const saveOrganizationalUnit = (error) => request('post', `${ORGANIZATIONALUNITS}`, error)
export const updateOrganizationalUnit = (id, error) => request('put', buildOrganizationalUnitUrl(id), error)
export const deleteOrganizationalUnit = (id) => request('delete', buildOrganizationalUnitUrl(id))

export const searchOrganizationalUnit = (name) => request('get', `/nero-api/searchOrganizationalUnit/${name}`)

// PERMIT RESOURCE
const PERMIT = '/permits'
const buildPermitUrl = id => `${PERMIT}/${id}`
export const getPermits = () => request('get', `${PERMIT}`)
export const getPermit = (id) => request('get', buildPermitUrl(id))
export const savePermit = (permit) => request('post', `${PERMIT}`, permit)
export const updatePermit = (id, permit) => request('put', buildPermitUrl(id), permit)
export const deletePermit = (id) => request('delete', buildPermitUrl(id))
