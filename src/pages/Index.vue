<template>
  <Layout>

    <Hero />

    <Skills />

      <Timeline />

    <div class="overflow-x-hidden">
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">
          <h2 class="font-bold mb-6 text-2xl" id="contact">Get in touch</h2>

          <p class="mb-12 text-lg">
            Have a question or want to discuss an opportunity? I can be found on
            the usual social networks or you can send me a note using the form
            below.
          </p>

          <div class="text-lg sm:text-lg mb-16">
            <form
              name="contact"
              method="post"
              v-on:submit.prevent="handleSubmit"
              action="/success/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label> Don’t fill this out: <input name="bot-field" /> </label>
              </p>
              <div class="flex flex-wrap mb-6 -mx-4">
                <div class="w-full md:w-1/2 mb-6 md:mb-0 px-4">
                  <label class="block mb-2 text-copy-primary" for="name">
                    Name:
                  </label>

                  <input
                    type="text"
                    name="name"
                    v-model="formData.name"
                    placeholder="Ignatius J. Reilly"
                    class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-teal-700 mb-2 p-4"
                    required
                  />
                </div>
                <div class="w-full px-4 md:w-1/2">
                  <label class="block text-copy-primary mb-2" for="email">
                    Email Address:
                  </label>

                  <input
                    type="email"
                    name="email"
                    v-model="formData.email"
                    placeholder="ignatius@gmail.com"
                    class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-teal-700 mb-2 p-4"
                    required
                  />
                </div>
              </div>

              <div class="w-full mb-12">
                <label class="block text-copy-primary mb-2" for="message">
                  Message:
                </label>

                <textarea
                  rows="5"
                  name="message"
                  v-model="formData.message"
                  class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-teal-700 mb-2 px-4 py-4"
                  placeholder="Enter your message here...."
                  required
                ></textarea>
              </div>

              <div class="flex justify-end w-full">
                <input
                  type="Submit"
                  class="block bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- end contact-me -->
    </div>
  </Layout>
</template>

<script>
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import Hero from "../components/Hero";


export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    Timeline,
    Skills,
    Hero
  },

  data() {
    return {
      formData: {},
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/success/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push("/success/"))
        .catch((error) => alert(error));
    },
  },
};
</script>
