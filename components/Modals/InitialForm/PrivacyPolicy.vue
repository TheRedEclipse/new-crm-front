<template>
  <b-modal
    id="privacy-policy"
    hide-footer
    size="lg"
    title="Privacy Policy"
    no-close-on-backdrop
  >
    <div style="height: 650px; overflow-x: auto">
      <HeaderComponent :number="1" :title="`What Are Cookies?`" />
      <div class="component">
        <p>
          A cookie is a small text file that a website stores on your computer
          or mobile device when you visit the site.
        </p>
        <p>
          First party cookies are cookies set by the website you’re visiting.
          Only that website can read them. In addition, a website might
          potentially use external services, which also set their own cookies,
          known as third-party cookies. Persistent cookies are cookies saved on
          your computer and that are not deleted automatically when you quit
          your browser, unlike a session cookie, which is deleted when you quit
          your browser.
        </p>
        <p>
          Every time you visit the Commission’s websites, you will be prompted
          to accept or refuse cookies.
        </p>
        <p>
          The purpose is to enable the site to remember your preferences (such
          as user name, language, etc.) for a certain period of time.
        </p>

        <p>
          That way, you don’t have to re-enter them when browsing around the
          site during the same visit.
        </p>
        <p>
          Cookies can also be used to establish anonymised statistics about the
          browsing experience on our sites.
        </p>
      </div>

      <HeaderComponent :number="2" :title="`How do we use cookies`" />

      <div class="component">
        <p>
          European Commission websites mostly use “first-party cookies”. These
          are cookies set and controlled by the Commission, not by any external
          organisation. However, to view some of our pages, you will have to
          accept cookies from external organisations. The 3 types of first-party
          cookie we use are to: store visitor preferences make our websites
          operational gather analytics data (about user behaviour) Visitor
          preferences These are set by us and only we can read them. They
          remember: if you have agreed to (or refused) this site’s cookie policy
          if you have already replied to our survey pop-up (about how helpful
          the site content was) – so you won't be asked again Name Service
          Purpose Cookie type and duration eu_cookie_consent Cookie consent kit
          Stores your cookie preferences (so you won’t be asked again)
          First-party session cookie deleted after you quit your browser ecsi
          Website survey tools Stores information on whether you have already
          replied to a survey pop-up – so you won't be asked again. First-party
          persistent cookie, 1 month cck3 Cookie consent kit Stores your
          preferences for 3rd-party cookies (so you won't be asked again)
          First-party session cookie deleted after you quit your browser cck1
          Cookie consent kit Stores your cookie preferences (so you won’t be
          asked again) First-party persistent cookie, 6 months clima_survey
          Climate Action Stores information on whether you have already replied
          to a survey pop-up – so you won't be asked again First-party
          persistent cookie, deleted after 1 day after you close the survey
          popup Deleted after 1 year if you respond or ask to not answer the
          survey econt_font_size DEVCO companion Stores the font size in which
          you want to read the content on the web page, following selection from
          the font-size menu First-party session cookie, deleted after you quit
          your browser econt_resizable_width DEVCO companion Remembers the width
          of the sidebar First-party session cookie, deleted after you quit your
          browser econt_font_size PRAG Practical guide Stores the font size in
          which you want to read the content on the web page, following
          selection from the font-size menu First-party session cookie, deleted
          after you quit your browser econt_resizable_width PRAG Practical guide
          Remembers the width of the sidebar First-party session cookie, deleted
          after you quit your browser escoLanguage ESCO Portal Stores your
          language preferences First-party cookie deleted after one week
          cookie-agreed Speech Repository Stores your cookie preferences (so you
          won’t be asked again) First-party persistent cookie, 100 days
          Operational cookies There are some cookies that we have to include in
          order for certain web pages to function. For this reason, they do not
          require your consent. In particular: authentication cookies technical
          cookies required by certain IT systems Authentication cookies These
          are stored when you log in to a Commission site, using our
          authentication service (EU Login). When you do this, you accept the
          associated privacy policy. Name Service Purpose Cookie type and
          duration MyECASDomain Identity Management Service Remembers your
          domain First-party session cookie, deleted after you quit your browser
          __Secure_CASTGC Identity Management Service Identifies your session
          First-party session cookie, deleted after you quit your browser
          __Secure_ECAS_SESSIONID Identity Management Service Identifies the
          current Central Authentication Service session First-party session
          cookie, deleted after you quit your browser ECAS_PREFS Identity
          Management Service Remembers your settings and preferences: user id,
          user name, acknowledged cookie policy, high contrast mode, privacy
          mode, view account details after login, last strength selected
          First-party session cookie, deleted after you quit your browser
          CASPRIVACY EURES The European Job Mobility Portal EURES Authentication
          info First-party session cookie, deleted after you quit your browser
          CASTGC EURES The European Job Mobility Portal EURES Authentication
          info First-party session cookie, deleted after you quit your browser
          EURES_CAS_LOGGED_IN EURES The European Job Mobility Portal EURES
          Authentication info First-party session cookie, deleted after you quit
          your browser AUTH Food systems platform Used to switch and
          authenticate between applications of Foods Systems First-party session
          cookie, deleted after you quit your browser SECTOR Food systems
          platform Used to switch and authenticate between applications of Foods
          Systems. First-party session cookie, deleted after you quit your
          browser CFCASCOUNTPPPADMIN PPP platform Cookie to limit the number of
          failed login attempts First-party session cookie, deleted after you
          quit your browser ecasST Food Systems Common Authorization Procedure
          Maintain a secure session for you, during your visit First-party
          session cookie, deleted after you quit your browser ecasUser Food
          Systems Common Authorization Procedure Maintain a secure session for
          you, during your visit First-party session cookie, deleted after you
          quit your browser userRoles Food Systems Common Authorization
          Procedure Stores the user role First-party session cookie, deleted
          after you quit your browser CFCASCOUNTADNS ADNS platform Cookie to
          limit the number of failed login attempts First-party session cookie,
          deleted after you quit your browser _WL_AUTHCOOKIE_TNTSESSIONID
          WebLogic platform Maintain a secure session for you, during your visit
          First-party session cookie, deleted after you quit your browser
          _WL_AUTHCOOKIE_JSESSIONID WebLogic platform Maintain a secure session
          for you, during your visit First-party session cookie, deleted after
          you quit your browser UserProfileRasff WebLogic platform Stores the
          user profile First-party session cookie, deleted after you quit your
          browser _WL_AUTHCOOKIE_SAAASIISession WebLogic platform Maintain a
          secure session for you, during your visit First-party session cookie,
          deleted after you quit your browser The names of these cookies may
          change, for technical reasons (particularly __Secure-CASTGC and
          __Secure-ECAS_SESSIONID).
        </p>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  components: {
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
  props: {
    modal: {
      type: Boolean,
      required: false,
      default: false,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      actions: [],
      rooms: [],
      index: 1,
      selected: [],
      renovation_type: 'Own settings',
      count: 0,
    }
  },
  mounted() {
    this.count = this.$store.getters['initialForm/getData'].counter
    this.requestData()
  },
  methods: {
    addroom() {
      this.selected.forEach((room) => {
        room.renovation_type = this.renovation_type
        this.count += 1
        this.$store.dispatch('initialForm/changeCounter', this.count)
        room.index = this.count
        room.measurements = { length: 0, width: 0, height: 0 }
      })
      this.$store.dispatch('initialForm/addRooms', this.selected)
      this.selected = []
      this.requestData()
      this.$emit('update_rooms')
      this.$bvModal.hide('add-room')
    },
    requestData() {
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
        .then((response) => (this.rooms = response.data.data.room_types))
    },
  },
}
</script>
<style lang="scss" scoped>
.component {
  margin: 23px 0 43px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 659px;
    margin: 0 0 22px;
  }
}
</style>
