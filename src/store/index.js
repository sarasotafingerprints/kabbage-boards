import { createStore } from 'vuex'
import { Directus } from '@directus/sdk';

const directus = new Directus('http://localhost:8055');
const directusLogin = 'runyan@ashtacore.com'
const directusPassword = 'd1r3ctu5'

export default createStore({
  state: {
    projects: [],
    activeProject: {
      id: 0,
      name: '',
      active: true
    },
    activeBoards: [],
    activeBuckets: [],
    activeTopics: [],
    activeComments: []
  },
  getters: {
    activeBoardIDs (state) {
      return state.activeBoards.map(board => board.id)
    },
    activeBucketIDs (state) {
      return state.activeBuckets.map(bucket => bucket.id)
    },
    activeTopicIDs (state) {
      return state.activeTopics.map(topic => topic.id)
    },
    sortedProjects (state) {
      return state.projects.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      });
    }
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setActiveProject(state, project) {
      state.activeProject = project;
    },
    setActiveBoards(state, boards) {
      state.activeBoards = boards;
    },
    setActiveBuckets(state, buckets) {
      state.activeBuckets = buckets;
    },
    setActiveTopics(state, topics) {
      state.activeTopics = topics;
    },
    setActiveComments(state, comments) {
      state.activeComments = comments;
    }
  },
  actions: {
    async connectToDirectus(context) {
      await directus.auth.login({
        email: directusLogin,
        password: directusPassword,
      }).catch(error => {
        console.log('Could not connect to Directus backend: ' + error);
      });

      await context.dispatch('getProjects');
    },

    async getProjects(context) {
      await directus.items('projects').readByQuery({
        fields: ['id', 'name', 'active'], limit: -1
      }).then(response => {
        context.commit('setProjects', response.data);
      }).catch(error => {
        console.log(error);
      });
    },

    async setActiveProject(context, projectID) {
      //Set active project
      context.commit('setActiveProject', context.state.projects.find(project => project.id == projectID));

      //Get boards relating to active project
      await directus.items('boards').readByQuery({
        fields: ['id', 'name'], limit: -1,
        filter: {"project_id": {"_eq": context.state.activeProject.id}}
      }).then(response => {
        context.commit('setActiveBoards', response.data);
      }).catch(error => {
        console.log('Could not get boards: ' + error);
        return
      });

      //Get buckets relating to active boards
      await directus.items('buckets').readByQuery({
        fields: ['id', 'name', 'board_id'], limit: -1,
        filter: {"board_id": {"_in": context.getters.activeBoardIDs}}
      }).then(response => {
        context.commit('setActiveBuckets', response.data);
      }).catch(error => {
        console.log('Could not get buckets: ' + error);
        return
      });

      //Get buckets relating to active boards
      await directus.items('topics').readByQuery({
        fields: ['id', 'name', 'bucket_id', 'priority', 'description', 'tags'], limit: -1,
        filter: {"bucket_id": {"_in": context.getters.activeBucketIDs}}
      }).then(response => {
        context.commit('setActiveTopics', response.data);
      }).catch(error => {
        console.log('Could not get topics: ' + error);
        return
      });

      //Get buckets relating to active boards
      await directus.items('comments').readByQuery({
        fields: ['id', 'comment', 'topic_id'], limit: -1,
        filter: {"topic_id": {"_in": context.getters.activeTopicIDs}}
      }).then(response => {
        context.commit('setActiveComments', response.data);
      }).catch(error => {
        console.log('Could not get comments: ' + error);
      });
    }
  },
})
