import { createStore } from 'vuex'
import { Directus } from '@directus/sdk';

let directus // var used for Directus instance

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
    activeComments: [],

    connected: false
  },
  getters: {
    sortedProjects (state) {
      return state.projects.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      }).filter(project => project.active);
    },

    activeBoardIDs (state) {
      return state.activeBoards.map(board => board.id);
    },
    activeBucketIDs (state) {
      return state.activeBuckets.map(bucket => bucket.id);
    },
    activeTopicIDs (state) {
      return state.activeTopics.map(topic => topic.id);
    },

    previouslyUsedTags (state) {
      let tags = [];
      state.activeTopics.forEach(topic => {
        tags = tags.concat(topic.tags);
      });
      return tags;
    },

    bucketsByBoardID (state) {
      let output = {}
      state.activeBoards.forEach(board => {
        output[board.id] = state.activeBuckets.filter(bucket => bucket.board_id === board.id)
      });
      return output
    },
    topicsByBucketID (state) {
      let output = {}
      state.activeBuckets.forEach(bucket => {
        output[bucket.id] = state.activeTopics.filter(topic => topic.bucket_id === bucket.id).sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        });
      });
      return output
    },
    commentsByTopicID (state) {
      let output = {}
      state.activeTopics.forEach(topic => {
        output[topic.id] = state.activeComments.filter(comment => comment.topic_id === topic.id).sort((a, b) => {
          if (a.date_created < b.date_created) return 1
          if (a.date_created > b.date_created) return -1
          return 0
        });
      });
      return output
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
    },
    setConnected(state, connected) {
      state.connected = connected;
    },

    upsertProject(state, project) {
      const i = state.projects.findIndex(v => v.id === project.id);
      if (i > -1) {
        state.projects[i] = project;
      } else {
        state.projects.push(project);
      }
    },
    upsertBoard(state, board) {
      const i = state.activeBoards.findIndex(v => v.id === board.id);
      if (i > -1) {
        state.activeBoards[i] = board;
      } else {
        state.activeBoards.push(board);
      }
    },
    upsertBucket(state, bucket) {
      const i = state.activeBuckets.findIndex(v => v.id === bucket.id);
      if (i > -1) {
        state.activeBuckets[i] = bucket;
      } else {
        state.activeBuckets.push(bucket);
      }
    },
    upsertTopic(state, topic) {
      const i = state.activeTopics.findIndex(v => v.id === topic.id);
      if (i > -1) {
        state.activeTopics[i] = topic;
      } else {
        state.activeTopics.push(topic);
      }
    },
    upsertComment(state, comment) {
      const i = state.activeComments.findIndex(v => v.id === comment.id);
      if (i > -1) {
        state.activeComments[i] = comment;
      } else {
        state.activeComments.push(comment);
      }
    }
  },
  actions: {
    async connectToDirectus(context, {directusEndpoint, directusLogin, directusPassword}) {
      directus = new Directus(directusEndpoint);

      await directus.auth.login({
        email: directusLogin,
        password: directusPassword,
      }).catch(error => {
        console.log('Could not connect to Directus backend: ' + error);
      });

      context.commit('setConnected', true);

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
        fields: ['id', 'comment', 'topic_id', 'user_created', 'date_created'], limit: -1,
        filter: {"topic_id": {"_in": context.getters.activeTopicIDs}}
      }).then(response => {
        context.commit('setActiveComments', response.data);
      }).catch(error => {
        console.log('Could not get comments: ' + error);
      });
    },

    newProject(context, projectName) {
      directus.items('projects').createOne({
        name: projectName,
      },{fields: ['id', 'name', 'active']}).then(newProject => {
        context.commit('upsertProject', newProject);
      }).catch(error => {
        console.log('Could not create new project: ' + error);
      });
    },

    newBoard(context, boardName) {
      if (context.state.activeProject.id > 0) {
        directus.items('boards').createOne({
          name: boardName,
          project_id: context.state.activeProject.id
        },{fields: ['id', 'name']}).then(newBoard => {
          context.commit('upsertBoard', newBoard);
        }).catch(error => {
          console.log('Could not create new board: ' + error);
        });
      } else {
        context.log("Error: No active project");
      }
    },

    newBucket(context, bucket) {
      directus.items('buckets').createOne(bucket ,{fields: ['id', 'name', 'board_id']}).then(newBucket => {
        context.commit('upsertBucket', newBucket);
      }).catch(error => {
        console.log('Could not create new bucket: ' + error);
      });
    },

    newTopic(context, topic) {
      directus.items('topics').createOne(topic ,{fields: ['id', 'name', 'bucket_id', 'priority', 'description', 'tags']}).then(newTopic => {
        context.commit('upsertTopic', newTopic);
      }).catch(error => {
        console.log('Could not create new topic: ' + error);
      });
    },

    newComment(context, comment) {
      directus.items('comments').createOne(comment ,{fields: ['id', 'comment', 'topic_id', 'user_created', 'date_created']}).then(newComment => {
        context.commit('upsertComment', newComment);
      }).catch(error => {
        console.log('Could not create new comment: ' + error);
      });
    },

    moveTopic(context, {newTopic, oldTopic}) {
      context.commit('upsertTopic', newTopic);
      directus.items('topics').updateOne(newTopic.id, newTopic ,{fields: ['id', 'name', 'bucket_id', 'priority', 'description', 'tags']}).catch(error => {
        console.log('Could not move topic: ' + error);
        context.commit('upsertTopic', oldTopic);
      });
    }
  },
})
