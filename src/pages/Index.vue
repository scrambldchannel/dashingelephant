<template>
  <Layout>
    <div
      id="about"
      class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16"
    >
      <div class="w-full sm:w-3/5 text-center sm:text-left">
        <div class="font-bold leading-tight text-4xl">Alexander Sutcliffe</div>
        <div class="font-bold text-teal-700 leading-tight text-2xl">
          Business Intelligence Specialist
        </div>
        <div class="flex-1 text-ms xs:text-sm mt-6">
          I'm an experienced Berlin-based consultant with a passion for
          leveraging technology to deliver data-driven insights. I have worked
          in a range of sectors and am comfortable in developer, analyst and
          leadership roles. I am proficient with a wide range of BI tools as
          well as SQL and Python. I also love my bicycle and my cat.
        </div>
      </div>
      <div class="mt-8 sm:mt-0">
        <!-- change this image -->
        <g-image
          src="../../static/avatar.jpg"
          alt="hero"
          class="w-64 h-64 rounded-full mx-auto sm:mx-0"
        />
      </div>
    </div>
    <!-- end hero -->

    <div class="overflow-x-hidden">
      <div
        class="projects container-inner mx-auto text-xl border-t border-gray-500 border-b py-16 mb-16 relative flex flex-wrap"
      >
        <div class="md:w-1/2 px-3">
          <h2 class="font-bold my-8 text-2xl" id="projects">Tech Skills</h2>

          <ul class="text-lg sm:text-lg space-y-6">
            <li class="checkmark">
              <div>TM1 / Planning Analytics</div>
              <div class="text-sm text-gray-600">
                10+ years of experience building blazing fast solutions with
                IBM Cognos TM1.
              </div>
            </li>
            <li class="checkmark">
              <div>Python</div>
              <div class="text-sm text-gray-600">
                My go to tool for data wrangling and automation. I have also
                often contributed to the TM1py project.
              </div>
            </li>
            <li class="checkmark">
              <div>SQL</div>
              <div class="text-sm text-gray-600">
                Extremely comfortable writing SQL and have a good understanding
                of relational database design.
              </div>
            </li>
            <li class="checkmark">
              <div>Other BI Tools</div>
              <div class="text-sm text-gray-600">
                Experienced building reports and dashboards with Cognos, Power
                BI, Tableau and more.
              </div>
            </li>
          </ul>
        </div>
        <div class="md:w-1/2 px-3 text-2xl">
          <h2 class="font-bold my-8" id="soft skills">Soft Skills</h2>

          <ul class="text-lg sm:text-lg space-y-6">
            <li class="checkmark">
              <div>Project Management</div>
              <div class="text-sm text-gray-600">
                Posess a record of delivering projects on time and within budget with
                an emphasis on communication.
              </div>
            </li>
            <li class="checkmark">
              <div>Agile</div>
              <div class="text-sm text-gray-600">
                Comfortable working in Agile environments and using small iterations
                and CI/CD to increase productivity.
              </div>
            </li>
            <li class="checkmark">
              <div>Team Lead</div>
              <div class="text-sm text-gray-600">
                Experience with leading teams of developers both colocated and
                remote.
              </div>
            </li>
            <li class="checkmark">
              <div>Mentoring</div>
              <div class="text-sm text-gray-600">
                Participated in mentoring schemes in the past and genuinely
                enjoy supporting colleagues.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="overflow-x-hidden border-gray-200 border-b">
      <div
        class="get-to-know-me container-inner mx-auto text-xl pb-16 relative"
      ></div>
    </div>

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
