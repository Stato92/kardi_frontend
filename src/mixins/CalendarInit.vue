<script>
export default {
  methods: {
    async initGapi() {
      this.gapi = await this.$gapi.getGapiClient();
    },
    async authenticateUser() {
      let GoogleAuth = await this.gapi.auth2.getAuthInstance();
      let GoogleUser;
      if (!GoogleAuth.isSignedIn.get()) {
        GoogleUser = await GoogleAuth.signIn({
          scope: "https://www.googleapis.com/auth/calendar.events"
        });
      } else {
        GoogleUser = await GoogleAuth.currentUser.get();
        if (
          !GoogleUser.hasGrantedScopes(
            "https://www.googleapis.com/auth/calendar.events"
          )
        ) {
          await GoogleUser.grant({
            scope: "https://www.googleapis.com/auth/calendar.events"
          });
        }
      }
    },
    async loadCalendarClient() {
      await this.gapi.client.load(
        "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      );
    }
  }
};
</script>
