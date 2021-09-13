export const state = () => ({
  data: {
    counter: 0,
    progress: 1,
    building_type: '',
    building_stage: '',
    completed_steps: [],
    rooms: [],
    floor_plan_photo: [],
    completed: false,
  },
})
export const mutations = {
  addBuildingType(state, content) {
    // state.data.building_type = content
    state.data.building_type = content.type
    state.data.building_type_id = content.id
  },
  addBuildingStage(state, content) {
    state.data.building_stage = content.stage
    state.data.building_stage_id = content.id
  },
  addState(state, content) {
    state.data.state = content
  },
  addProjectStageDate(state, content) {
    state.data.project_stage_date = content.date
    state.data.project_stage_date_id = content.id
  },
  addRooms(state, content) {
    // на случай если ебанутся вcе комнаты в хранилище (стереть все)
    // state.data.rooms = []
    state.data.rooms.push(content)
  },
  addMeasurements(state, content) {
    state.data.rooms.forEach((room) => {
      if (content.index === room.index) {
        room.measurements = content
      }
    })
  },
  changeCounter(state, content) {
    state.data.counter = content
    // state.data.rooms = []
  },
  addWorks(state, content) {
    // находим комнату благодаря сохранённому в объекте индексу и перезаписываем ворки
    state.data.rooms.forEach((room, i) => {
      if (room.index === content.id_room) {
        state.data.rooms[i].works = content.works
      }
    })
  },
  addStyles(state, content) {
    state.data.rooms.forEach((room, i) => {
      if (room.index === content.id_room) {
        state.data.rooms[i].styles = content.styles.filter(
          (style) => style !== null && style !== undefined
        )
      }
    })
  },
  addPhoto(state, content) {
    if (content.variety === 'floor-plan') {
      state.data.floor_plan_photo = content.images
    } else {
      state.data.rooms.forEach((room, i) => {
        if (room.index === content.id_room) {
          if (content.variety === 'styles') {
            state.data.rooms[i].styles_photo = content.images
          }
          if (content.variety === 'condition') {
            state.data.rooms[i].condition_photo = content.images
          }
        }
      })
    }
  },
  addPinterestLink(state, content) {
    state.data.rooms.forEach((room, i) => {
      if (room.index === content.id_room) {
        state.data.rooms[i].pinterest = content.link
      }
    })
  },
  addAdditionalInfo(state, content) {
    state.data.rooms.forEach((room, i) => {
      if (room.index === content.id_room) {
        state.data.rooms[i].additional_info = content.info
      }
    })
  },
  addAdditionalInfoFloorPlan(state, content) {
    state.data.additional_info_floor_plan = content
  },
  addPersonalData(state, content) {
    state.data.personal_data = content.personal
    state.data.address = content.address
  },
  addProgress(state, content) {
    if (state.data.progress < 6 && content !== null)
      state.data.completed_steps.push(content)
    state.data.progress = Math.max.apply(null, state.data.completed_steps)
    // оставил для обнуления страниц
    // state.data.progress = 1
    // state.data.completed_steps = []
    // state.data.completed = false
  },
  deleteRooms(state, content) {
    state.data.rooms.forEach((room, i) => {
      if (room.index === content) {
        state.data.rooms.splice(i, 1)
      }
    })
  },
  completeForm(state, content) {
    state.data.completed = true
    state.data = {
      counter: 0,
      progress: 1,
      completed_steps: [],
      rooms: [],
      floor_plan_photo: [],
      completed: false,
    }
  },
}
export const getters = {
  getData: (state) => {
    return state.data
  },
}
export const actions = {
  addBuildingType(context, content) {
    context.commit('addBuildingType', content)
  },
  addBuildingStage(context, content) {
    context.commit('addBuildingStage', content)
  },
  addState(context, content) {
    context.commit('addState', content)
  },
  addProjectStageDate(context, content) {
    context.commit('addProjectStageDate', content)
  },
  addRooms(context, content) {
    content.forEach((element) => {
      context.commit('addRooms', element)
    })
  },
  addMeasurements(context, content) {
    context.commit('addMeasurements', content)
  },
  changeCounter(context, content) {
    context.commit('changeCounter', content)
  },
  addWorks(context, content) {
    context.commit('addWorks', content)
  },
  addStyles(context, content) {
    context.commit('addStyles', content)
  },
  addPhoto(context, content) {
    context.commit('addPhoto', content)
  },
  addPinterestLink(context, content) {
    context.commit('addPinterestLink', content)
  },
  addAdditionalInfo(context, content) {
    context.commit('addAdditionalInfo', content)
  },
  addAdditionalInfoFloorPlan(context, content) {
    context.commit('addAdditionalInfoFloorPlan', content)
  },
  addPersonalData(context, content) {
    context.commit('addPersonalData', content)
  },
  addProgress(context, content) {
    context.commit('addProgress', content)
  },
  deleteRooms(context, content) {
    context.commit('deleteRooms', content)
  },
  completeForm(context, content) {
    context.commit('completeForm', content)
  },
}
