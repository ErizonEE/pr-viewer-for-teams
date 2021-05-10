<template>
  <div class="home">
    <div v-if="loading" style="text-align: center">
      Cargando Información 
      <br/>
      <img src="/images/loading.gif" alt="">
    </div>
    <div v-else>
      <h2 style="text-align: center">{{ prs.length }} Pull Requests</h2>
      <p style="cursor: pointer" @click="allPrs = !allPrs">
        <input type="checkbox" v-model="allPrs"/> Traer todos
      </p>
      <select v-if="!allPrs" v-model="branch" style="margin: 10px">
            <option value="master">Master</option>
            <option value="sandbox">Sandbox</option>
            <option value="develop">Develop</option>
        </select>
      <table style="width: 100%;" border="1">
        <thead>
          <tr>
            <th>Repositorio</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody style="text-align: center">
          <tr v-for="(pr, index) in prs" :key="index">
            <td>{{ pr.repo }}</td>
            <td>{{ pr.user.login }}</td>
            <td>{{ pr.created_at }}</td>
            <td><a :href="pr.html_url" target="_blank">{{ pr.title }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import httpClient from '@/tools/httpClient'
export default {
  name: 'Home',
  data: () => ({
    organization: process.env.VUE_APP_ORGANIZATION_NAME,
    loading: true,
    repos: [],
    branch: 'sandbox',
    pullRequests: [],
    allPrs: false
  }),
  computed: {
    prs(){
      if(this.allPrs){
        console.log('entre en el true')
        return this.pullRequests.filter(el => {
          console.log(el.user.login.search('[bot]'))
          return el.user.login.indexOf('[bot]') === -1
        })
      }
      else {
        return this.pullRequests.filter(el => el.title.indexOf(`[${this.branch}]`) >=0 )
      }
    }
  },
  beforeMount(){
      this.getRepositories()
  },
  methods: {
    getRepositories () {
      httpClient(`/orgs/${this.organization}/repos`)
        .then(res => {
          this.repos = res.data.map(el => el.name )
        })
        .finally(() => {
          this.loading = false;
          this.getPrs()
        })
    },
    getPrs(){
      this.repos.forEach(repo => {
        httpClient(`/repos/${this.organization}/${repo}/pulls`)
        .then(res => {
          res.data.forEach(element => {
            this.pullRequests.push({ ...element, repo })
          });
        })
      })
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }
  tr:hover{
    background-color: aliceblue;
  }
</style>