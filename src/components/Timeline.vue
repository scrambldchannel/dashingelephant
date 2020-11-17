<template>
  <div class="get-to-know-me container-inner mx-auto text-xl pb-16 relative">
    <div class="font-bold mb-16 text-2xl">Career Overview</div>

    <section id="cd-timeline" class="cd-container">
      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>
        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2003</div>
          <p class="text-sm text-gray-600">
            Completed a BSc in Computing Science at the University of NSW,
            Sydney. Got hooked on Linux and learned Python 1.x.
          </p>
        </div>
      </div>

      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2004</div>
          <p class="text-sm text-gray-600">
            Moved to Europe in search of fame and fortune! Expected to be back
            within two years but I've my home in Europe now.
          </p>
        </div>
      </div>
      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2005 - 2006</div>
          <p class="text-sm text-gray-600">
            Systems Analyst at a large telco, built my first Busines Objects
            report and automated everything I could with VBScript.
          </p>
        </div>
      </div>
      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2007 - 2011</div>
          <p class="text-sm text-gray-600">
            Worked as an analyst / developer at RBS, a large bank in Edinburgh.
            Spent my days with Cognos, Oracle and Business Objects.
          </p>
        </div>
      </div>

      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2011 - 2013</div>
          <p class="text-sm text-gray-600">
            First steps as a freelance consultant, worked on several large scale
            projects implementing TM1 as a planning solution.
          </p>
        </div>
      </div>
      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2013 - 2018</div>
          <p class="text-sm text-gray-600">
            Joined Roche in Basel as TM1 specialist, held leadership roles and
            also worked as an architect and PM.
          </p>
        </div>
      </div>

      <div class="cd-timeline-block">
        <div class="cd-timeline-img"></div>

        <div class="cd-timeline-content text-lg sm:text-lg space-y-6 mb-10">
          <div>2019 - present</div>
          <p class="text-sm text-gray-600">
            Came to Berlin to be with my partner and went back to freelancing.
            Have consulted on two finance transformations as a TM1 / planning
            specialists.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {};
  },
};
</script>

<style>
/* --------------------------------

Main components

-------------------------------- */

#cd-timeline {
  position: relative;
  padding: 2em 0;
}
#cd-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 25px;
  height: 100%;
  width: 2px;
  @apply bg-gray-400;
}
@media only screen and (min-width: 1170px) {
  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}

.cd-timeline-block {
  position: relative;
}
.cd-timeline-block:after {
  content: "";
  display: table;
  clear: both;
}
.cd-timeline-block:first-child {
  margin-top: 0;
}
.cd-timeline-block:last-child {
  margin-bottom: 0;
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-block {
    margin: 0em 0;
  }
  .cd-timeline-block:first-child {
    margin-top: 0;
  }
  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }
}

.cd-timeline-img {
  position: absolute;
  top: 8px;
  left: 12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.cd-timeline-img {
  @apply bg-teal-700;
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-img {
    width: 30px;
    height: 30px;
    left: 50%;
    margin-left: -15px;
    margin-top: 15px;
  }
}

.cd-timeline-content {
  position: relative;
  margin-left: 60px;
  margin-right: 30px;
  border-radius: 2px;
  padding: 1em;
  .timeline-content-info {
    border-radius: 2px;
    i {
      margin-right: 5px;
    }
    .timeline-content-info-title,
    .timeline-content-info-date {
      width: calc(50% - 2px);
      display: inline-block;
    }
    @media (max-width: 500px) {
      .timeline-content-info-title,
      .timeline-content-info-date {
        display: block;
        width: 100%;
      }
    }
  }
}
.cd-timeline-content:after {
  content: "";
  display: table;
  clear: both;
}
.cd-timeline-content {
  display: inline-block;
}

.cd-timeline-content::before {
  content: "";
  position: absolute;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid #333C42;
}

@media only screen and (min-width: 1170px) {
  .cd-timeline-content {
    margin-left: 0;
    width: 36%;
  }
  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: #333C42;
  }
  .cd-timeline-content .cd-date {
    width: 50%;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color: #333C42;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
  }
}
</style>
