<template>
  <Layout>
    <div
      class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16"
    >
      <div class="font-bold w-full sm:w-3/5 text-center sm:text-left">
        <div class="leading-tight text-4xl">Alexander Sutcliffe</div>
        <div class="text-teal-700 leading-tight text-2xl">
          Business Intelligence Specialist
        </div>
      </div>
      <div class="mt-8 sm:mt-0">
        <!-- change this image -->
        <g-image
          src="../../static/chart.svg"
          alt="hero"
          class="mx-auto sm:mx-0"
        />
      </div>
    </div>
    <!-- end hero -->

    <div class="overflow-x-hidden">
      <div
        class="projects container-inner mx-auto text-xl border-t border-gray-500 border-b py-16 mb-16 relative flex"
      >
        <div class="w-1/2 pr-3">
          <h2 class="font-bold mb-8 text-center text-2xl" id="projects">
            Tech Skills
          </h2>

          <ul class="text-lg sm:text-lg space-y-6">
            <li class="checkmark">
              <div>TM1 / Planning Analytics</div>
              <div class="text-sm text-gray-600">
                10+ years of experience building blazing fast solutions using
                IBM Cognos TM1. Comfortable with all aspects of model design and
                overall architecture.
              </div>
            </li>
            <li class="checkmark">
              <div>Python</div>
              <div class="text-sm text-gray-600">
                Good level of proficiency for automation, analysis and data
                pipeline creation. I have also contributed to projects such as
                TM1py and Apahe Airflow.
              </div>
            </li>
            <li class="checkmark">
              <div>SQL</div>
              <div class="text-sm text-gray-600">
                Extremely comfortable writing SQL for ad hoc analysis and ETL
                purposes and possess a good understanding of the basis of
                relational database design.
              </div>
            </li>
          </ul>
        </div>
        <div class="w-1/2 pl-3 text-2xl">
          <h2 class="font-bold text-center mb-8" id="soft skills">
            Soft Skills
          </h2>

          <ul class="text-lg sm:text-lg space-y-6">
            <li class="checkmark">
              <div>Project Management</div>
              <div class="text-sm text-gray-600">
                A track record of delivering projects on time and within budget
                with an emphasis on stakeholder communication.
              </div>
            </li>
            <li class="checkmark">
              <div>Agile/DevOPs</div>
              <div class="text-sm text-gray-600">
                Comfortable working in Agile environments using small iterations
                and CI/CD to deliver increased value and transparency to
                stakeholders.
              </div>
            </li>
            <li class="checkmark">
              <div>Team Lead</div>
              <div class="text-sm text-gray-600">
                Experience with leading small teams both colocated and remote.
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- end projects -->
    </div>

    <div class="overflow-x-hidden border-gray-200 border-b">
      <div
        class="get-to-know-me container-inner mx-auto text-xl pb-16 relative"
      >
        <h2 class="font-bold mb-6" id="about">About me:</h2>

        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-16"
        >
          <div>
            <g-image
              src="../../static/avatar.jpg"
              alt="avatar"
              class="w-32 h-32 rounded-full mb-8 lg:mb-0"
            />
          </div>
          <div class="flex-1 text-lg sm:text-xl ml-6">
            I'm an experienced Berlin based professional with a passion for
            technology and using it deliver insights into data. I'm also into
          </div>
        </div>
      </div>
      <!-- end get-to-know me -->
    </div>

    <div class="overflow-x-hidden">
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">
          <h2 class="font-bold mb-6" id="contact">Contact me:</h2>

          <p class="mb-12">
            Have a question or want to discuss an opportunity? Drop me a note
            and I'll get back to you.
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
export default {
  metaInfo: {
    title: "Home",
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
