import * as api from '@/api'

export const getCurrentUser = ({ commit }, user) => {
  api.getCurrentUser().then(result => {
    user.name = result.data.username
    user.email = result.data.email
    commit('UPDATE_USER', user)
  }, (err) => {
    console.log(err)
  })
}

export const getFlows = ({ commit }) => {
  return api.getFlows().then(res => commit('GET_FLOW_LIST', res.data))
}

export const getSteps = ({ commit }) => {
  return api.getSteps().then(res => commit('GET_STEP_LIST', res.data))
}

export const addFlow = ({ commit }, flow) => {
  commit('ADD_FLOW', flow)
}

export const addStep = ({ commit }, step) => {
  commit('ADD_STEP', step)
}

export const doActiveFlow = ({ commit, getters, dispatch }, id) => {
  commit('ACTIVE_FLOW', id)
  return dispatch('getFlowSteps', id)
}

export const getFlowSteps = ({ commit, getters, dispatch }, idFlow) => {
  return api.getAllStepsFromFlow(idFlow)
          .then(steps => {
            commit('ADD_STEPS_2_FLOW', { value: steps.data, id: getters.activeFlow._id })
          })
}

export const activeStep = ({ commit }, id) => {
  commit('ACTIVE_STEP', id)
}

export const getFlow = ({ dispatch, getters, commit }, id) => {
  return api.getFlow(id).then(res => {
    commit('ACTIVE_FLOW', id)
    if (!getters.activeFlow) {
      commit('ADD_FLOW', res.data)
    }

    if (res.data.firsStep) {
      dispatch('getStep', res.data.firstStep)
    }
  })
}

export const getFlowEdit = ({ dispatch, getters, commit }, id) => {
  return api.getFlow(id).then(res => {
    return api.getAllStepsFromFlow(id).then(steps => {
      commit('CLEAR_FLOW_TO_EDIT')
      commit('ADD_FLOW_TO_EDIT', {item: res.data, steps: steps.data})
    })
  })
}

export const getStep = ({ commit, getters }, id) => {
  if (id) {
    return api.getStep(id).then(res => {
      commit('ACTIVE_STEP', id)
      if (!getters.activeStep) {
        commit('ADD_STEP', res.data)
      }
    })
  } else {
    commit('ACTIVE_STEP', null)
  }
}

export const saveStep = ({ commit, getters, dispatch }, step) => {
  step.flowID = getters.activeFlow._id
  return api.saveStep(step).then(function (rest) {
    commit('ADD_STEP', rest.data)
    commit('ACTIVE_STEP', rest.data._id)
    dispatch('doActiveFlow', getters.activeFlow._id)
    commit('ADD_RESULT_TO_ALERT', rest)
    return rest
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const updateStep = ({ dispatch, commit, getters }, { id, step }) => {
  return api.updateStep(id, step).then(res => {
    commit('ACTIVE_STEP', id)
    commit('EDIT_STEP', {id: id, value: res.data})
    dispatch('doActiveFlow', getters.activeFlow._id)
    commit('ADD_RESULT_TO_ALERT', res)
    return res.data
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const deleteStepsFromFlow = ({ getters }, id) => {
  return api.deleteStepsFromFlow(id)
}

export const deleteFirstStep = ({ getters }, id) => {
  return api.deleteFirstStep(id)
}

export const deleteStep = ({ commit, dispatch, getters }, id) => {
  return api.deleteStep(id).then(res => {
    commit('DELETE_STEP', id)
    commit('ADD_RESULT_TO_ALERT', res)
    dispatch('deleteFirstStep', id).then(() => {
      dispatch('deleteStepsFromFlow', id).then(() => {
        dispatch('doActiveFlow', getters.activeFlow._id)
      })
    })
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const saveFlow = ({ commit }, flow) => {
  api.saveFlow(flow).then(res => {
    commit('ADD_FLOW', res.data)
    commit('ACTIVE_FLOW', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const updateFlow = ({ commit, dispatch }, { id, flow }) => {
  return api.updateFlow(id, flow)
     .then(res => {
       // parche: si selecciono que no tiene paso asignado, entonces borro el primer paso
       // y para eso necesito el ultimo fist step, xq flow.firstStep  ya viene steado con undefined
       if (flow.firstStep === undefined && flow.lastFirstStep) {
         return dispatch('deleteFirstStep', flow.lastFirstStep).then(() => {
           commit('EDIT_FLOW', {id: id, value: flow})
           commit('ADD_RESULT_TO_ALERT', res)
         })
       }
       commit('EDIT_FLOW', {id: id, value: flow})
       commit('ADD_RESULT_TO_ALERT', res)
     })
     .catch(e => {
       let result = {}
       result.status = 404
       commit('ADD_RESULT_TO_ALERT', result)
     })
}

export const deleteFlow = ({ commit }, id) => {
  api.deleteFlow(id).then(res => {
    commit('DELETE_FLOW', id)
    commit('ADD_RESULT_TO_ALERT', res)
  })
  .catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const saveTemplate = ({ commit }, template) => {
  commit('SAVE_TEMPLATE', template)
}

export const getTemplates = ({ commit }) => {
  return api.getTemplates().then((res) => {
    commit('GET_TEMPLATE_LIST', res.data.filter(template => { return template.name !== 'maintenance' }))
  })
}

export const getTemplate = ({ getters, commit }, id) => {
  return api.getTemplate(id).then(res => {
    commit('ACTIVE_TEMPLATE', res.data._id)
    if (!getters.activeTemplate) {
      commit('ADD_TEMPLATE', res.data)
    }
  })
}

// SECTOR

export const saveSector = ({ commit }, sector) => {
  // group = getters.activeGroup
  return api.saveSector(sector).then(res => {
    commit('ADD_SECTOR', res.data)
    // commit('ACTIVE_SECTOR', res.data._id)
    commit('ADD_SECTORS_OF_IDGROUP', res.data)
    commit('ADD_RESULT_TO_ALERT', res)
    return res.data
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}
export const activateSelectedSector = ({ commit, getters }, id) => {
  if (id) {
    commit('ACTIVE_SECTOR', id)
  } else {
    commit('ACTIVE_SECTOR', null)
  }
}

export const getSector = ({ commit, getters }, id) => {
  if (id) {
    return api.getSector(id).then(res => {
      commit('ACTIVE_SECTOR', res.data._id)
      if (!getters.activeSector) {
        commit('ADD_SECTOR', res.data)
      }
      return res.data
    })
  } else {
    commit('ACTIVE_SECTOR', null)
  }
}

export const getAllSectorsOfIdGroup = ({ commit, getters }, idGroup) => {
  return api.getAllSectorsOfIdGroup(idGroup).then(res => {
    commit('GET_LIST_SECTORS_OF_IDGROUP', res.data)
    return res.data
  })
}

export const updateSector = ({ commit }, { id, sector }) => {
  api.updateSector(id, sector).then(res => {
    commit('EDIT_SECTOR', {id: id, value: sector})
    commit('EDIT_SECTOR_OF_IDGROUP', {id: id, value: sector})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const deleteTerminalInSector = ({ commit }, { idSector, idTerminal }) => {
  return api.deleteTerminalInSector(idSector, idTerminal).then(res => {
    return res
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const addTerminalInSector = ({ commit }, { idSector, idTerminal }) => {
  return api.addTerminalInSector(idSector, idTerminal).then(() => {
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getSectors = ({ commit }) => {
  return api.getSectors().then(res => {
    commit('GET_SECTOR_LIST', res.data)
    return res.data
  })
}

export const deleteSector = ({ commit, getters }, id) => {
  api.deleteSector(id).then(res => {
    commit('DELETE_SECTOR', id)
    commit('DELETE_SECTOR_OF_IDGROUP', id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

// GROUP

export const saveGroup = ({ commit }, group) => {
  api.saveGroup(group).then(res => {
    commit('ADD_GROUP', res.data)
    commit('ACTIVE_GROUP', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getGroup = ({ commit, getters }, id) => {
  if (id) {
    return api.getGroup(id).then(res => {
      commit('ACTIVE_GROUP', res.data._id)

      if (!getters.activeGroup) {
        commit('ADD_GROUP', res.data)
      }
    })
  } else {
    commit('ACTIVE_GROUP', null)
  }
}

export const updateGroupLocal = ({ commit }, { id, group }) => {
  commit('EDIT_GROUP', {id: id, value: group})
}

export const updateGroup = ({ commit, dispatch }, { id, group }) => {
  return api.updateGroup(id, group).then(res => {
    dispatch('updateGroupLocal', {id, group})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getGroups = ({ commit, dispatch }) => {
  return api.getGroups().then(res => {
    commit('GET_GROUP_LIST', res.data)
    return res.data
  })
}

export const deleteGroup = ({ commit }, id) => {
  api.deleteGroup(id).then(res => {
    commit('DELETE_GROUP', id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const doActiveGroup = ({ commit }, id) => {
  commit('ACTIVE_GROUP', id)
}

export const getOneGroupBySectorId = ({ dispatch }, idSector) => {
  return api.getOneGroupBySectorId(idSector)
}

// TERMINAL

export const clearTerminalToOneSector = ({ commit }) => {
  commit('CLEAR_TERMINAL_TO_ONE_SECTOR')
}

export const saveTerminal = ({ commit, dispatch }, { terminal, idSector, idGroup }) => {
  return api.saveTerminal(terminal).then(res => {
    let idTerminal = res.data._id
    commit('ADD_TERMINAL', res.data)
    commit('ADD_TERMINAL_TO_ONE_SECTOR', res.data)
    dispatch('updateTerminalCode', idTerminal)
    dispatch('addTerminalInSector', {idSector, idTerminal})
    commit('ADD_RESULT_TO_ALERT', res)
    return res
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getTerminal = ({ getters, commit }, idTerminal) => {
  return api.getTerminal(idTerminal).then(res => {
    commit('ACTIVE_TERMINAL', idTerminal)
    if (!getters.activeTerminal) {
      commit('ADD_TERMINAL', res.data)
    }
    return res.data
  })
}

export const updateTerminalCode = (id) => {
  return api.updateTerminalCode(id)
}

export const deleteTerminal = ({ dispatch, commit }, oneTerminal) => {
  api.deleteTerminal(oneTerminal._id).then(res => {
    commit('DELETE_TERMINAL', oneTerminal._id)
    dispatch('deleteTerminalInSector', { idSector: oneTerminal.sectorId, idTerminal: oneTerminal._id })
    commit('ADD_RESULT_TO_ALERT', res)
  })
  .catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getAllTerminalsOfIdSector = ({ commit, getters }, idSector) => {
  return api.getAllTerminalsOfIdSector(idSector).then((res) => {
    commit('CLEAR_TERMINALS_TO_ONE_SECTOR')
    commit('GET_TERMINAL_LIST_TO_ONE_SECTOR', res.data)
    return res.data
  })
  .catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const updateTerminal = ({ commit, getters }, { id, terminal }) => {
  return api.updateTerminal(id, terminal).then(res => {
    commit('EDIT_TERMINAL', {id: id, value: terminal})
    if (getters.terminalsToOneSector.length > 0) {
      commit('EDIT_TERMINAL_TO_ONE_SECTOR', {id: id, value: terminal})
    }
    commit('ADD_RESULT_TO_ALERT', res)
    return res
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getTerminals = ({ commit }) => {
  return api.getTerminals().then(res => {
    var terminalesFiltrados = res.data.filter(function (oneElement) {
      return oneElement.flowID !== undefined
    })
    commit('GET_TERMINAL_LIST', terminalesFiltrados)
  })
}

export const getTerminalsFrom = ({ commit, getters, dispatch }, id) => {
  commit('CLEAR_TERMINALS')
  id.forEach((idTerminal) => {
    api.getTerminal(idTerminal).then(res => {
      commit('ADD_TERMINAL', res.data)
    }).catch(e => {
      let result = {}
      result.status = 404
      commit('ADD_RESULT_TO_ALERT', result)
    })
  })
}

// PROCEDURE
export const saveProcedure = ({ commit }, procedure) => {
  api.saveProcedure(procedure).then(res => {
    commit('ADD_PROCEDURE', res.data)
    commit('ACTIVE_PROCEDURE', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getProcedure = ({ commit, getters }, id) => {
  if (id) {
    return api.getProcedure(id).then(res => {
      commit('ACTIVE_PROCEDURE', res.data._id)
      if (!getters.activeProcedure) {
        commit('ADD_PROCEDURE', res.data)
      }
      return res.data
    })
  } else {
    commit('ACTIVE_PROCEDURE', null)
  }
}

export const updateProcedure = ({ commit, dispatch }, { id, procedure }) => {
  return api.updateProcedure(id, procedure).then(res => {
    commit('EDIT_PROCEDURE', {id: id, value: procedure})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getProcedures = ({ commit, dispatch }) => {
  return api.getProcedures().then(res => commit('GET_PROCEDURE_LIST', res.data))
}

export const deleteProcedure = ({ commit }, id) => {
  api.deleteProcedure(id).then(res => {
    commit('DELETE_PROCEDURE', id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

// STEPPROCEDURE
export const saveStepProcedure = ({ commit }, stepProcedure) => {
  return api.saveStepProcedure(stepProcedure).then(res => {
    commit('ADD_STEPPROCEDURE', res.data)
    commit('ACTIVE_STEPPROCEDURE', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
    return res.data
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getStepProcedure = ({ commit, getters }, id) => {
  if (id) {
    return api.getStepProcedure(id).then(res => {
      commit('ACTIVE_STEPPROCEDURE', res.data._id)
      if (!getters.activeStepProcedure) {
        commit('ADD_STEPPROCEDURE', res.data)
      }
      return res.data
    })
  } else {
    commit('ACTIVE_STEPPROCEDURE', null)
  }
}

export const updateStepProcedure = ({ commit, dispatch }, { id, stepProcedure }) => {
  return api.updateStepProcedure(id, stepProcedure).then(res => {
    commit('EDIT_STEPPROCEDURE', {id: id, value: res.data})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getStepProcedures = ({ commit, dispatch }) => {
  return api.getStepProcedures().then(res => commit('GET_STEPPROCEDURE_LIST', res.data))
}

export const deleteStepProcedure = ({ commit }, id) => {
  api.deleteStepProcedure(id).then(res => {
    commit('DELETE_STEPPROCEDURE', id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const deleteStepProcedureAndStep = ({ commit, dispatch }, oneStep) => {
  dispatch('deleteStep', oneStep._id).then(() => {
    oneStep.stepsIDTemplate.forEach((oneStepProcedue, index) => {
      if (oneStepProcedue.procedure) {
        dispatch('deleteStepProcedure', oneStepProcedue.stepid)
      }
    })
  })
}

// ERROR
export const saveError = ({ commit }, error) => {
  api.saveProcedure(error).then(res => {
    commit('ADD_ERROR', res.data)
    commit('ACTIVE_ERROR', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getError = ({ commit, getters }, id) => {
  if (id) {
    return api.getError(id).then(res => {
      commit('ACTIVE_ERROR', res.data._id)
      if (!getters.activeError) {
        commit('ADD_ERROR', res.data)
      }
    })
  } else {
    commit('ACTIVE_ERROR', null)
  }
}

export const updateError = ({ commit, dispatch }, { id, error }) => {
  return api.updateError(id, error).then(res => {
    commit('EDIT_ERROR', {id: id, value: error})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getErrors = ({ commit, dispatch }) => {
  return api.getErrors().then(res => commit('GET_ERROR_LIST', res.data))
}

// ORGANIZATIONALUNIT
export const saveOrganizationalUnit = ({ commit }, organizationalUnit) => {
  api.saveOrganizationalUnit(organizationalUnit).then(res => {
    commit('ADD_ORGANIZATIONALUNIT', res.data)
    commit('ACTIVE_ORGANIZATIONALUNIT', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getOrganizationalUnit = ({ commit, getters }, id) => {
  if (id) {
    return api.getOrganizationalUnit(id).then(res => {
      commit('ACTIVE_ORGANIZATIONALUNIT', res.data._id)
      if (!getters.activeOrganizationalUnit) {
        commit('ADD_ORGANIZATIONALUNIT', res.data)
      }
      return res.data
    })
  } else {
    commit('ACTIVE_ORGANIZATIONALUNIT', null)
  }
}

export const searchOrganizationalUnitByName = ({ commit, getters }, organizationalUnitName) => {
  if (organizationalUnitName) {
    return api.searchOrganizationalUnit(organizationalUnitName).then(res => {
      commit('ACTIVE_ORGANIZATIONALUNIT', res.data._id)
      if (!getters.activeOrganizationalUnit) {
        commit('ADD_ORGANIZATIONALUNIT', res.data)
      }
      return res.data
    })
  } else {
    commit('ACTIVE_ORGANIZATIONALUNIT', null)
  }
}

export const updateOrganizationalUnit = ({ commit, dispatch }, { id, organizationalUnit }) => {
  return api.updateOrganizationalUnit(id, organizationalUnit).then(res => {
    commit('EDIT_ORGANIZATIONALUNIT', {id: id, value: organizationalUnit})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getOrganizationalUnits = ({ commit, dispatch }) => {
  return api.getOrganizationalUnits().then(res => commit('GET_ORGANIZATIONALUNIT_LIST', res.data))
}

export const deleteOrganizationalUnit = ({ commit }, id) => {
  api.deleteOrganizationalUnit(id).then(res => {
    commit('DELETE_ORGANIZATIONALUNIT', id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

// PERMIT permit
export const savePermit = ({ commit }, permit) => {
  api.saveProcedure(permit).then(res => {
    commit('ADD_PERMIT', res.data)
    commit('ACTIVE_PERMIT', res.data._id)
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getPermit = ({ commit, getters }, id) => {
  if (id) {
    return api.getPermit(id).then(res => {
      commit('ACTIVE_PERMIT', res.data._id)
      if (!getters.activePermit) {
        commit('ADD_PERMIT', res.data)
      }
    })
  } else {
    commit('ACTIVE_PERMIT', null)
  }
}

export const updatePermit = ({ commit, dispatch }, { id, permit }) => {
  return api.updatePermit(id, permit).then(res => {
    commit('EDIT_PERMIT', {id: id, value: permit})
    commit('ADD_RESULT_TO_ALERT', res)
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_RESULT_TO_ALERT', result)
  })
}

export const getPermits = ({ commit, dispatch }) => {
  return api.getPermits().then(res => commit('GET_PERMIT_LIST', res.data))
}

// OTHERS
export const clearResultToAlert = ({ commit }) => {
  commit('CLEAR_RESULT_TO_ALERT')
}

export const loadLastPage = ({ commit }, page) => {
  commit('LAST_PAGE', page)
}

export const getInfoOrganizationalUnit = ({ commit }, group) => {
  return api.searchGroup(group).then((res) => {
    commit('ADD_INFO_ORGANIZATIONAL_UNIT', res.data.result)
    return res.data.result
  }).catch(e => {
    let result = {}
    result.status = 404
    commit('ADD_INFO_ORGANIZATIONAL_UNIT', result)
    return e
  })
}

export const clearResultToInfoOrganizationalUnit = ({ commit }) => {
  commit('CLEAR_INFO_ORGANIZATIONAL_UNIT')
}
