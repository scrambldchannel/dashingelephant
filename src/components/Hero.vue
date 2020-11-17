<template>
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

</template>

<script>
export default {
  name: "Hero",
  data() {
    return {};
  },
};
</script>
