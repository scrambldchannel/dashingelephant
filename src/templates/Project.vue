<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight">
        {{ $page.project.title }}
      </h1>
      <div class="text-xl text-gray-600 mb-4">{{ $page.project.date }}</div>
      <div class="flex mb-8 text-sm">
        <g-link
          :to="tag.path"
          v-for="tag in $page.project.tags"
          :key="tag.id"
          class="bg-gray-300 rounded-full px-4 py-2 mr-4 hover:bg-teal-300"
        >
          {{ tag.title }}
        </g-link>
      </div>
      <VueRemarkContent />
      <div class="mb-8">
        <g-link to="/blog" class="font-bold uppercase">Back to Blog</g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Project ($path: String!) {
  project: project (path: $path) {
    title
    date (format: "MMMM D, Y")
    content

  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.project.title,
    };
  },
};
</script>

<style src="../css/github-markdown.css" />
