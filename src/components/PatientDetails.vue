<template>
  <div>
    <div
      v-if="showUploadPreview"
      @click="hidePreview()"
      class="fixed top-0 left-0 w-screen h-screen z-70 cursor-pointer flex flex-row justify-center items-start"
      style="background: rgba(0,0,0,0.7)"
    >
      <iframe
        :src="uploadPreview || ''"
        class="mx-auto h-screen z-80 border-0"
        style="width: 50%"
        scrolling="no"
        frameborder="0"
        ref="previewIframe"
      ></iframe>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 fill-current text-white"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </div>
    <h1 class="text-xl lg:text-3xl text-white mb-2 lg:mb-4">
      Karta pacjenta
    </h1>
    <div
      v-if="!!patient"
      :class="[
        patient.is_alive
          ? 'bg-blue-800 text-white'
          : 'bg-gray-200 text-gray-600'
      ]"
      class="shadow-outline rounded-lg px-4 lg:px-6 py-2 lg:py-4 mb-4 leading-normal mb-2 lg:mb-4"
    >
      <div
        class="flex flex-row justify-between items-center w-full mb-3 lg:mb-6"
      >
        <span class="w-full lg:text-2xl tracking-widest">
          {{ patient.name }} {{ patient.surname }}
          <span class="ml-2 lg:ml-4 text-xs lg:text-sm" v-if="patient.pesel">{{
            " lat " + ageFromPesel(patient.pesel) || ""
          }}</span>
        </span>
        <span class="flex flex-row">
          <svg
            @click="
              () => {
                $store.commit('setEditMode', true);
                $store.commit('setCurrentModal', 'newPatient');
              }
            "
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 lg:w-8 lg:h-8 fill-current opacity-50 hover:opacity-100 cursor-pointer"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"
            />
          </svg>
          <svg
            @click="removePatient(patient)"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 lg:w-8 lg:h-8 fill-current ml-4 opacity-50 hover:opacity-100 cursor-pointer"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </span>
      </div>
      <div class="flex flex-row justify-start items-center w-full mb-2 lg:mb-4">
        <span class="w-1/4 lg:w-48 mr-2 text-sm lg:text-xl">Nr pesel</span>
        <span class="text-xs lg:text-base">{{ patient.pesel || "brak" }}</span>
      </div>
      <div class="flex flex-row justify-start items-start w-full mb-2 lg:mb-4">
        <span class="w-1/4 lg:w-48 mr-2 text-sm lg:text-xl"
          >Numery telefonów</span
        >
        <div
          class="flex flex-col justify-between items-start text-justify text-xs lg:text-base"
        >
          <template
            v-if="
              patient.phone_numbers != null &&
                Array.isArray(JSON.parse(patient.phone_numbers))
            "
            ><a
              v-for="phone in JSON.parse(patient.phone_numbers)"
              :href="'tel:' + phone"
              :key="phone"
              >{{ phone }}</a
            ></template
          >
          <span v-else>nie podano</span>
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full mb-2 lg:mb-4">
        <span class="w-1/4 lg:w-48 mr-2 text-sm lg:text-xl">Email</span>
        <a
          v-if="patient.email != null"
          class="text-xs lg:text-base"
          :href="'mailto:' + patient.email"
          >{{ patient.email }}</a
        >
        <span class="text-xs lg:text-base" v-else>nie podano</span>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-center items-start w-full mb-2 lg:mb-4"
      >
        <span class="w-full lg:w-48 mr-2 text-sm lg:text-xl"
          >Choroby towarzyszące</span
        >
        <span class="text-justify text-xs lg:text-base flex-1">{{
          patient.diagnosis || "brak"
        }}</span>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-start items-start w-full mb-2 lg:mb-4"
      >
        <span class="w-1/4 lg:w-48 mr-2 text-sm lg:text-xl">Rozpoznanie</span>
        <div class="flex flex-col justify-between items-start">
          <template v-if="patient.diseases && patient.diseases.length > 0"
            ><span
              v-for="patient_disease in patient.diseases"
              :key="patient_disease.id"
              class="text-xs lg:text-base"
            >
              {{ patient_disease.name }}
            </span></template
          >
          <span v-else>brak</span>
        </div>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-start items-start w-full mb-2 lg:mb-4"
      >
        <span class="w-full lg:w-48 mr-2 text-sm lg:text-xl"
          >Lekarz prowadzący</span
        >
        <span class="text-xs lg:text-base">{{
          patient.user.name + " " + patient.user.surname || "brak"
        }}</span>
      </div>
      <div
        class="flex flex-col mt-2 lg:mt-4 lg:flex-row justify-start items-start w-full mb-2 lg:mb-4"
      >
        <div
          class="w-1/4 lg:w-48 mr-2 text-sm lg:text-xl flex-shrink-0 tracking-widest"
        >
          Załączniki
        </div>
        <div class="w-full">
          <div>
            <transition
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
              mode="out-in"
            >
              <ul v-if="uploadedFiles.length !== 0">
                <transition-group name="file-transition">
                  <li
                    v-for="uploaded_file in uploadedFiles"
                    :key="uploaded_file.id"
                    class="file flex flex-row justify-between items-center px-2 py-2 lg:py-2 mt-2 border-2 border-white rounded-lg"
                  >
                    <my-menu
                      :item-object="uploaded_file"
                      :menu-items="myMenuItems"
                      :right-expand="true"
                      :icon-size="10"
                      v-on:show-file="showFile($event)"
                      v-on:preview-file="previewFile($event)"
                      v-on:remove-file="removeFile($event)"
                      v-on:download-file="downloadFile($event)"
                    ></my-menu>
                    <div
                      class="ml-2 lg:ml-4 text-sm lg:text-base break-all flex-auto"
                    >
                      {{ uploaded_file.original_name }}
                    </div>
                    <div class="ml-2 flex-end flex-shrink-0 text-xs lg:text-sm">
                      {{ uploaded_file.created_at }}<br />
                      {{
                        uploaded_file.user.name +
                          " " +
                          uploaded_file.user.surname
                      }}
                    </div>
                  </li>
                </transition-group>
              </ul>
              <div class="text-xs lg:text-base text-gray-500" v-else>
                Brak załączników
              </div>
            </transition>
          </div>
          <div class="flex justify-center mt-4 items-center">
            <vue-dropzone
              v-on:vdropzone-sending="sendingEvent"
              v-on:vdropzone-success="successEvent"
              v-on:vdropzone-error="errorEvent"
              id="dropzone"
              ref="fileUpload"
              :options="uploadOptions"
              :duplicateCheck="true"
              class="rounded-lg w-full shadow-outline cursor-pointer hover:bg-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-xl lg:text-3xl text-white mb-2 lg:mb-4">
      Statusy
    </h1>
    <span
      v-if="statuses.length === 0"
      class="tracking-wider text-sm lg:text-base text-gray-400 mt-2 flex flex-row items-center bg-blue-800 rounded-lg px-2 lg:px-4 py-2 lg:py-4 mb-4"
    >
      <svg
        class="w-6 lg:w-8 fill-current mr-2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"
        />
      </svg>

      Brak statusów</span
    >
    <div
      v-else
      :class="
        patient.is_alive
          ? 'bg-blue-800 text-white'
          : 'bg-gray-200 text-gray-600'
      "
      class="flex flex-col justify-between items-center shadow-outline rounded-lg px-6 pt-4 mb-4 last:mb-0 leading-normal mt-4"
    >
      <div
        v-for="status in sortedStatuses"
        :key="status.id"
        class="flex flex-row justify-start items-center w-full mb-4"
      >
        <div class="px-2 w-full">
          <span class="text-sm lg:text-xl w-128">{{ status.name }}</span>
        </div>
        <div class="text-sm lg:text-xl px-2 lg:px-8 flex-1">
          <span>{{ status.created_at }}</span>
        </div>
        <div class="text-sm lg:text-xl lg:w-128 px-2 lg:px-8">
          <span>{{ status.user.name }} {{ status.user.surname }}</span>
        </div>
        <div class="text-sm lg:text-xl w-8 px-2 lg:px-8 flex-1">
          <span>P{{ status.priority }}</span>
        </div>
        <div class="w-8">
          <svg
            @click="removeStatus(status)"
            class="w-6 lg:w-8 fill-current cursor-pointer opacity-50 hover:opacity-100"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </div>
      </div>
    </div>
    <comments v-if="patient" :entity="'patients'" :item-id="patient.id" />
  </div>
</template>

<script>
import { age, noPreviewMimeTypes } from "../helpers";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import MyMenu from "./MyMenu";
import Comments from "./Comments";

import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";

export default {
  name: "patientDetails",
  components: {
    vueDropzone: vue2Dropzone,
    myMenu: MyMenu,
    comments: Comments
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  beforeRouteUpdate(to, from, next) {
    this.getData();
    next();
  },
  data() {
    return {
      patient: "",
      uploadedFiles: [],
      statuses: [],
      uploadOptions: {
        url: window.baseUrl + "/uploads",
        thumbnailWidth: 180,
        maxFilesize: 50,
        acceptedMimeTypes:
          "image/jpeg,image/gif,image/bmp,image/png,video/mp4,video/x-ms-wmv,video/x-msvideo,video/3gpp,video/MP2T,video/avi,video/mpeg,video/quicktime,application/pdf,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12",
        autoProcessQueue: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        },
        thumbnailMethod: "contain",
        dictDefaultMessage: "Przeciągnij pliki lub kliknij tutaj",
        dictFileTooBig:
          "Wybrany plik jest zbyt duży. Maksymalny rozmiar to 50 MB.",
        dictInvalidFileType: "Nieprawidłowy typ pliku",
        dictCancelUpload: "Anuluj",
        dictUploadCanceled: "Anulowano wysyłanie pliku",
        dictRemoveFile: "Usuń"
      },
      showUploadPreview: false,
      uploadPreview: {},
      myMenuItems: [
        {
          action: {
            type: "method",
            name: "preview-file"
          },
          svg: `<path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"/>`,
          title: "Pokaż podgląd"
        },
        {
          action: {
            type: "method",
            name: "show-file"
          },
          svg: `<path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>`,
          title: "Podgląd w nowym oknie"
        },
        {
          action: {
            type: "method",
            name: "download-file"
          },
          svg: `<path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 12v7H5v-7H3v9h18v-9h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/>`,
          title: "Pobierz plik"
        },
        {
          action: {
            type: "method",
            name: "remove-file"
          },
          svg: `<path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>`,
          title: "Usuń plik"
        }
      ]
    };
  },
  methods: {
    setEchoListeners() {
      this.$echo
        .private("patients." + this.$route.params.id)
        .listen(".status.created", e => {
          if (this.$store.getters.user.id !== e.status.user_id)
            this.$snotify.info("Dodano nowy status");
          this.statuses.unshift(e.status);
        })
        .listen(".status.deleted", e => {
          this.$snotify.info("Usunięto status");
          this.statuses.splice(
            this.statuses.findIndex(stat => stat.id === e.status.id),
            1
          );
        })
        .listen(".patient.edited", e => {
          if (!this.$store.getters.editMode) {
            this.$snotify.info("Edytowano pacjenta");
          }
          this.patient = e.patient;
        })
        .listen(".patient.deleted", e => {
          this.$router.push({ name: "patients" });
        });
    },
    getData() {
      this.uploadedFiles = this.$store.getters.responseData.uploadedFiles;
      this.statuses = this.$store.getters.responseData.statuses;
      this.patient = this.$store.getters.responseData.patient;
      this.$store.commit("setCurrentPatient", this.patient);
    },
    ageFromPesel(pesel = "") {
      return age(pesel);
    },
    getUploadedFiles() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "patients/" + this.patient.id + "/uploads"
        })
        .then(response => {
          this.uploadedFiles = response.data;
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    sendingEvent(file, xhr, formData) {
      formData.append("patient_id", this.patient.id);
    },
    successEvent(file) {
      this.$snotify.success("Plik wysłany");
      this.getUploadedFiles();
      window.setTimeout(this.$refs.fileUpload.removeFile, 2000, file);
    },
    errorEvent(file, xhr) {
      this.$snotify.error("Błąd przy wysyłaniu pliku \n" + xhr, {
        timeout: 5000
      });
      window.setTimeout(this.$refs.fileUpload.removeFile, 5000, file);
    },
    removedFileEvent(file) {
      let response = JSON.parse(file.xhr.response);
      if (response.status === "success") {
        this.removeFile(JSON.parse(file.xhr.response).uploaded_file);
      }
    },
    removeFile(file) {
      this.$snotify.warning("Czy na pewno chcesz usunąć plik?", {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        position: "centerCenter",
        pauseOnHover: true,
        buttons: [
          {
            text: "Tak",
            action: toast => {
              this.$snotify.remove(toast.id);
              this.$store.commit("setLoading", true);
              this.$http
                .delete("uploads/" + file.id)
                .then(() => {
                  this.$snotify.success("Plik usunięty");
                  this.getUploadedFiles();
                })
                .catch(error =>
                  this.$snotify.error("Błąd przy usuwania pliku" + "\n" + error)
                )
                .finally(() => this.$store.commit("setLoading", false));
            },
            bold: true
          },
          { text: "Nie", action: toast => this.$snotify.remove(toast.id) }
        ]
      });
    },
    showFile(file) {
      if (this.previewExtensionCheck(file.original_name)) {
        this.$http.get("uploads/" + file.id + "/show").then(response => {
          return window.open(response.data, "_blank");
        });
      }
    },
    downloadFile(file) {
      this.$snotify.async(
        "Trwa pobieranie pliku",
        () =>
          new Promise((resolve, reject) => {
            this.$http({
              url: "uploads/" + file.id + "/download",
              method: "GET",
              responseType: "blob"
            })
              .then(response => {
                let fileURL = window.URL.createObjectURL(
                  new Blob([response.data])
                );
                let fileLink = document.createElement("a");
                fileLink.href = fileURL;
                fileLink.setAttribute("download", file.original_name);
                document.body.appendChild(fileLink);
                fileLink.click();
              })
              .then(() => {
                resolve(this.$snotify.remove());
                this.$snotify.success("Plik pobrany");
              })
              .catch(() => {
                reject(this.$snotify.remove());
                this.$snotify.error("Błąd przy pobieraniu pliku");
              });
          }),
        {
          position: "centerCenter",
          animation: { exit: "fadeOut", time: 400 }
        }
      );
    },
    previewFile(file) {
      if (this.previewExtensionCheck(file.original_name)) {
        disableBodyScroll(this.$refs.previewIframe);
        this.$snotify.async(
          "Trwa generowanie podglądu pliku",
          () =>
            new Promise((resolve, reject) => {
              this.$http({
                url: "uploads/" + file.id + "/download",
                method: "GET",
                responseType: "blob"
              })
                .then(response => {
                  this.uploadPreview = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  this.showUploadPreview = true;
                  resolve(this.$snotify.remove());
                  this.$snotify.success("Podgląd wygenerowany");
                })
                .catch(() => {
                  reject(this.$snotify.remove());
                  this.$snotify.error("Błąd przy generowaniu podglądu");
                  this.hidePreview();
                });
            }),
          {
            position: "centerCenter"
          }
        );
      }
    },
    hidePreview() {
      this.showUploadPreview = false;
      this.uploadPreview = {};
      enableBodyScroll();
    },
    previewExtensionCheck: function(fileName) {
      if (
        noPreviewMimeTypes.indexOf(
          fileName.slice(fileName.lastIndexOf(".") + 1)
        ) === -1
      ) {
        return true;
      } else {
        this.$snotify.warning("Podgląd niedostępny");
      }
    },
    removeStatus(status) {
      this.$snotify.warning("Czy na pewno chcesz usunąć status?", {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        position: "centerCenter",
        pauseOnHover: true,
        buttons: [
          {
            text: "Tak",
            action: toast => {
              this.$snotify.remove(toast.id);
              this.$store.commit("setLoading", true);
              this.$http
                .delete("/statuses/" + status.id, status)
                .then(() => {
                  this.$snotify.success("Status usunięty");
                  this.statuses.splice(
                    this.statuses.findIndex(sta => sta.id === status.id),
                    1
                  );
                })
                .catch(error =>
                  this.$snotify.error(
                    "Błąd przy usuwaniu statusu" + "\n" + error
                  )
                )
                .finally(() => this.$store.commit("setLoading", false));
            },
            bold: true
          },
          { text: "Nie", action: toast => this.$snotify.remove(toast.id) }
        ]
      });
    },
    removePatient(patient) {
      this.$snotify.warning(
        "Uwaga! Usunięcie pacjenta spowoduje także usunięcie wszelkich powiązanych z nim statusów, plików i komentarzy!",
        "Usunąć pacjenta?",
        {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          position: "centerCenter",
          pauseOnHover: true,
          buttons: [
            {
              text: "Tak",
              action: toast => {
                this.$snotify.remove(toast.id);
                this.$store.commit("setLoading", true);
                this.$http
                  .delete("/patients/" + patient.id, patient)
                  .then(() => {
                    this.$router.push({ name: "patients" });
                    this.$snotify.success("Pacjent usunięty");
                  })
                  .catch(error =>
                    this.$snotify.error(
                      "Błąd przy usuwaniu pacjenta" + "\n" + error
                    )
                  )
                  .finally(() => this.$store.commit("setLoading", false));
              },
              bold: true
            },
            { text: "Nie", action: toast => this.$snotify.remove(toast.id) }
          ]
        }
      );
    }
  },
  computed: {
    sortedStatuses() {
      let sortedStatuses = this.statuses;
      return sortedStatuses.sort((curr, next) => {
        new Date(next.created_at) - new Date(curr.created_at);
      });
    }
  },
  activated() {
    this.setEchoListeners();
  },
  created() {},
  deactivated() {
    this.$echo.leave("patients." + this.patient.id);
  },
  beforeDestroy() {
    clearAllBodyScrollLocks();
    this.$echo.leave("patients." + this.patient.id);
  }
};
</script>

<style scoped>
.file {
  transition: all 0.5s;
}
.file-transition-enter,
.file-transition-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
.file-transition-leave-active {
  position: absolute;
}
.file-transition-enter {
  transform: translateY(-40px) scaleY(0.001);
}
.file-transition-leave-to {
  transform: scaleY(0.001) translateX(-100px);
}
</style>
