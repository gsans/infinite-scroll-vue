<template>
  <div id="app">
    <div class="app-header">
      <div class="app-logo">
        <img
          src="https://aws-amplify.github.io/images/Logos/Amplify-Logo-White.svg"
          alt="AWS Amplify"
        />
      </div>
      <h1>Welcome to the Amplify Framework</h1>
    </div>
    <div class="app-body">
      <h1>Contacts</h1>
      <div class="container" v-scroll:bottom.window="loadMore">
        <div v-for="contact of contacts" :key="contact.id">
          <div class="shadow-xl m-6 md:flex bg-white rounded-lg p-6">
            <img
              class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
              :src="contact.imageUrl"
            />
            <div class="text-center md:text-left">
              <h2 class="text-lg">{{ contact.fullName }}</h2>
              <div class="text-gray-600">{{ contact.email }}</div>
              <div class="text-gray-600">{{ contact.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import { listContactsByFullName } from './graphql/queries';

export default {
  name: "App",
  data() {
    return {
      contacts: [],
      nextToken: undefined,
      loading: false,
    };
  },
  methods: {
    async getData() {
      try {
        if (this.loading) return;
        this.loading = true;
        const response = await API.graphql(graphqlOperation(listContactsByFullName, { 
          book: "personal", 
          limit: 2,
          sortDirection: "ASC"
        }));
        this.contacts = response.data.listContactsByFullName.items;
        this.nextToken = response.data.listContactsByFullName.nextToken;
      }
      catch (error) {
        console.log('Error loading contacts...', error);
      }
      finally {
        this.loading = false;
      }
    },
    async loadMore() {
      try {
        if (!this.nextToken || this.loading) return;
        this.loading = true;
        const response = await API.graphql(graphqlOperation(listContactsByFullName, { 
          book: "personal", 
          limit: 1,
          sortDirection: "ASC",
          nextToken: this.nextToken
        }));
        this.contacts = [...this.contacts, ...response.data.listContactsByFullName.items];
        this.nextToken = response.data.listContactsByFullName.nextToken;
      }
      catch (error) {
        console.log('Error loading more contacts...', error);
      }
      finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
body {
  display: flex;
  flex-direction: column;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(226, 232, 240);
  flex-grow: 1;
}
:root {
  --amazonOrange: #ff9900;
  --lightAmazonOrange: #ffac31;
  --darkAmazonOrange: #e88b01;
  --squidInk: #232f3e;
  --lightSquidInk: #31465f;
  --deepSquidInk: #152939;
  --grey: #828282;
  --lightGrey: #c4c4c4;
  --silver: #e1e4ea;
  --darkBlue: #31465f;
  --red: #dd3f5b;
  --white: #ffffff;
  --light-blue: #00a1c9;
  --button-color: var(--white);
  --button-background-color: var(--amazonOrange);
  --button-click: var(--darkAmazonOrange);
  --link-color: var(--amazonOrange);
  --form-color: var(--white);
  --input-color: var(--deepSquidInk);
  --input-background-color: var(--white);
  --font-family: "Amazon Ember", "Helvetica Neue Light", "Helvetica Neue",
    "Helvetica", "Arial", "sans-serif";
  --body-background: #f8f4f4;
  --component-width-desktop: 460px;
  --component-width-mobile: 100%;
  --color-primary: #ff9900;
  --color-primary-accent: #232f3e;
  --color-primary-highlight: #ffc46d;
  --color-background: #232f3e;
  --color-secondary: #152939;
  --color-secondary-accent: #31465f;
  --color-danger: #dd3f5b;
  --color-error: #d0021b;
  --color-accent-brown: #828282;
  --color-accent-blue: #e1e4ea;
  --gradient-blaze: linear-gradient(270deg, #ffc300 0%, #ff9000 100%);
  --color-blue: #007eb9;
  --color-purple: #527fff;
  --color-gray: #828282;
  --color-white: #ffffff;
  --input-border: 1px solid #c4c4c4;
  --input-padding: 0.5em 0.5em 0.3em 1em;
  --box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
  --button-height: 42px;
  --interactions-conversation-height: 250px;
  --ion-color-primary: #ff9900;
  --ion-color-primary-rgb: 255, 153, 0;
  --ion-color-primary-contrast: #fff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #232f3e;
  --ion-color-primary-tint: #ffc46d;
}
html,
body {
  font-family: "Amazon Ember", "Helvetica", "sans-serif";
  margin: 0;
  height: 100%;
}
a {
  color: #ff9900;
}
.app-header h1 {
  font-weight: 300;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
}
.app-body h1 {
font-weight: 300;
font-size: 2em;
}
.app {
  width: 100%;
}
.app-header {
  color: white;
  text-align: center;
  background: linear-gradient(30deg, #f90 55%, #ffc300);
  width: 100%;
  margin: 0 0 1em 0;
  padding: 3em 0 3em 0;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
}
.app-logo {
  width: 126px;
  margin: 0 auto;
}
.app-body {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  xmin-height: 500px;
}
.form-body {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.form-body button {
  background-color: #ff9900;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  padding: 1em;
  border: none;
  cursor: pointer;
  margin: 10px;
}
button:hover {
  opacity: 0.8;
}
input {
  width: 100px;
  padding: 6px;
  font-size: 14px;
  color: var(--input-color);
  background-color: var(--input-background-color);
  background-image: none;
  border: 1px solid var(--lightGrey);
  border-radius: 3px;
  box-sizing: border-box;
  margin: 10px;
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  min-width: 180px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  /* height: 100%; */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  backface-visibility: hidden;
  margin: 25px;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.15);
}
.name {
  font-style: italic;
}
.symbol {
  color: #999;
}
.price,
.loading {
  font-weight: bold;
  font-size: 2em;
  line-height: 0.9;
  margin: 10px;
}
.loading {
  margin-top: 35px;
}
/* remove blue highlight */
textarea:hover,
input:hover:not([type="checkbox"]),
textarea:active,
input:active:not([type="checkbox"]),
textarea:focus,
input:focus:not([type="checkbox"]),
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active,
select {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
textarea {
  background-color: #eee;
  border-radius: 0 4px 4px 0;
}
textarea {
  border-radius: 4px 0 0 4px;
  border-right: 10px solid #dbdbdb;
}
.remove {
  top: -15px;
  position: relative;
  align-self: flex-end;
}
.remove button {
  background-color: #dd3f5b;
  color: white;
  border-radius: 31px;
  border: 0px;
}
.SelectInput__selectInput___1I_W8 > select {
  margin-top: 10px;
  margin-right: -10px;
  padding: 16px 20px 16px 16px;
  background-position: calc(100% - 10px) calc(1em + 8px),
    calc(100% - 4px) calc(1em + 8px), calc(100% - 2.5em) 0.5em !important;
}
.chatty-container,
.input {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 190;
  background: rgb(233, 229, 229);
  border-radius: 5px;
}

.form-body form {
  width: 100%;
}

.app-body button {
  min-width: 153px;
}
.app-body {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.form-body {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.form-body button {
  background-color: #ff9900;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  padding: 1em;
  border: none;
  cursor: pointer;
  margin: 10px;
}
.app-body button:hover {
  opacity: 0.8;
}
input {
  padding: 6px;
  font-size: 14px;
  color: var(--input-color);
  background-color: var(--input-background-color);
  background-image: none;
  border: 1px solid var(--lightGrey);
  border-radius: 3px;
  box-sizing: border-box;
  margin: 10px;
}
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.welcome h1 {
  margin-right: 40px;
}
.offline,
.input.offline {
  background: #f06292;
}
.offline-msg {
  position: relative;
  height: 60px;
  padding-top: 10px;
  font-weight: 600;
  font-size: 1em;
  font-style: italic;
}

.container {
  xmax-height: 200px;
}

@media screen and (max-width: 640px) {
  .app-body {
    width: 95%;
  }
  .welcome {
    flex-direction: column;
    margin-bottom: 20px;
  }
  .app-body button {
    min-width: unset;
  }
  .app-header h1 {
    display: none;
  }
  .app-header {
    margin: unset;
    padding: 20px 0px 20px 0px;
  }
}
</style>
