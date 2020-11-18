<template>
  <Layout>
    <Hero />
    <Skills />
    <Timeline />
    <ContactForm />
  </Layout>
</template>

<script>
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";

export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    Timeline,
    Skills,
    Hero,
    ContactForm,
  },
};
</script>
