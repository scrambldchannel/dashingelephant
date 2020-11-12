<template>
  <Layout>
    <div class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16">
      <div class="text-4xl font-bold w-full sm:w-3/5 text-center sm:text-left">
        <div class="leading-tight">Alexander Sutcliffe</div>
        <div class="text-teal-700 leading-tight">Business Intelligence Specialist</div>
      </div>
      <div class="mt-8 sm:mt-0">
        <!-- change this image --> 
        <g-image src="../../static/developer.svg" alt="hero" class="mx-auto sm:mx-0" />
      </div>
    </div> <!-- end hero -->

    <div class="overflow-x-hidden">
      <div class="projects container-inner mx-auto text-xl border-t border-gray-500 border-b py-16 mb-16 relative">
        <h2 class="font-bold mb-6" id="projects">Technical Skills</h2>


        <ul class="text-lg sm:text-xl space-y-6">
          <li class="checkmark">
            <div>TM1 / Planning Analytics</div>
            <div class="text-lg text-gray-600">10+ years of experience building blazing fast solutions using IBM Cognos TM1. Comfortable with all aspects of model design and overall architecture.</div>
          </li>
          <li class="checkmark">
            <div>Python</div>
            <div class="text-lg text-gray-600">Good level of proficiency for automation, analysis and data pipeline creation. I have also contributed to projects such as TM1py and Apahe Airflow.</div>
          </li>
          <li class="checkmark">
            <div>SQL</div>
            <div class="text-lg text-gray-600">Extremely comfortable writing SQL for ad hoc analysis and ETL purposes and possess a good understanding of the basis of relational database design.</div>
          </li>

        </ul>
        <h2 class="font-bold my-6" id="soft skills">Soft Skills</h2>

        <ul class="text-lg sm:text-xl space-y-6">
          <li class="checkmark">
            <div>Project Management</div>
            <div class="text-lg text-gray-600">A track record of delivering projects on time and within budget with an emphasis on stakeholder communication.</div>
          </li>
          <li class="checkmark">
            <div>Agile</div>
            <div class="text-lg text-gray-600">Good level of proficiency for automation, analysis and data pipeline creation. I have also contributed to projects such as TM1py and Apahe Airflow.</div>
          </li>
          <li class="checkmark">
            <div>Team Lead</div>
            <div class="text-lg text-gray-600">Extremely comfortable writing SQL for ad hoc analysis and ETL purposes and possess a good understanding of the basis of relational database design.</div>
          </li>


        </ul>
      </div> <!-- end projects -->
    </div>

    <div class="overflow-x-hidden border-gray-200 border-b">
      <div class="get-to-know-me container-inner mx-auto text-xl pb-16 relative">
        <h2 class="font-bold mb-6" id="about">Get to know me:</h2>


        <div class="flex flex-col sm:flex-row justify-between items-center mb-16">
          <div><g-image src="../../static/avatar.jpg" alt="avatar" class="w-32 h-32 rounded-full mb-8 lg:mb-0" /></div>
          <div class="flex-1 text-lg sm:text-xl ml-6">Experienced developer sharing my passion for all things techn as well as my other interests such as photography, cycling and cricket.</div>
        </div>

      </div> <!-- end get-to-know me -->
    </div>

    <div class="overflow-x-hidden">
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">
          <h2 class="font-bold mb-6" id="contact">Contact me:</h2>

          <p class="mb-12">Have a question or want to discuss an opportunity? Drop me a note and I'll get back to you.</p>

          <div class="text-lg sm:text-lg mb-16">
            <form action="#" class="mb-12">
              <div class="flex flex-wrap mb-6 -mx-4">
                  <div class="w-full md:w-1/2 mb-6 md:mb-0 px-4">
                      <label class="block mb-2 text-copy-primary" for="name">
                          Name
                      </label>

                      <input type="text" name="name" id="name" placeholder="Jon Snow" class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-teal-700 mb-2 p-4" required>
                  </div>

                  <div class="w-full px-4 md:w-1/2">
                      <label class="block text-copy-primary mb-2" for="email">
                          Email Address
                      </label>

                      <input type="email" name="email" id="email" placeholder="email@example.com"  class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-teal-700 mb-2 p-4" required>
                  </div>
              </div>

              <div class="w-full mb-12">
                  <label class="block text-copy-primary mb-2" for="message">
                      Message
                  </label>

                  <textarea id="message" rows="5" name="message" class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-teal-700 mb-2 px-4 py-4" placeholder="Enter your message here." required></textarea>
              </div>

              <div class="flex justify-end w-full">
                  <input type="submit" value="Submit" class="block bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3">
              </div>
          </form>
          </div>
        </div>
      </div> <!-- end contact-me -->
    </div>


  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>

