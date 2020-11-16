<template>
  <!-- The Timeline -->
<div>
            <h2 class="font-bold mb-16 text-2xl" >Career Overview</h2>


  <section id="cd-timeline" class="cd-container">

    <div class="cd-timeline-block">

      <div class="cd-timeline-img cd-picture"></div>

      <div class="cd-timeline-content">
        <h2>2003</h2>
        <div class="timeline-content-info">
          <p>
            Completed a BSc in Computing Science at the University of NSW,
            Sydney. Got hooked on Linux and learned Python 1.x.
          </p>
        </div>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->

    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-movie"></div>
      <!-- cd-timeline-img -->

      <div class="cd-timeline-content">
        <h2>2004</h2>
        <p>
          Moved to Europe in search of fame and fortune! Expected to be back
          within two years but life doesn't always go to plan.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->
    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-movie"></div>
      <!-- cd-timeline-img -->

      <div class="cd-timeline-content">
        <h2>2005 - 2006</h2>
        <p>
          Systems Analyst at a large telco, built my first Busines Objects
          report and automated everything I could with VBScript.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->
    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-picture"></div>
      <!-- cd-timeline-img -->

      <div class="cd-timeline-content">
        <h2>2007 - 2011</h2>
        <p>
          Worked as an analyst / developer at RBS, a large bank in Edinburgh.
          Worked with Cognos, Oracle and Business Objects.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->

    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-location"></div>
      <!-- cd-timeline-img -->

      <div class="cd-timeline-content">
        <h2>2011 - 2013</h2>
        <p>
          First steps as a freelance consultant, worked on several large scale
          projects to implement TM1 as a planning tool.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->
    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-location"></div>

      <div class="cd-timeline-content">
        <h2>2013 - 2018</h2>
        <p>
          Joined Roche in Basel as TM1 specialist. Held leadership roles and
          also worked as an architect and a PM.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->

    <div class="cd-timeline-block">
      <div class="cd-timeline-img cd-location"></div>

      <div class="cd-timeline-content">
        <h2>2019 - present</h2>
        <p>
          Came to Berlin to be with my partner and went back to freelancing.
          Have worked on two large finance transformation programmes.
        </p>
      </div>
      <!-- cd-timeline-content -->
    </div>
    <!-- cd-timeline-block -->
  </section>
</div>  <!-- cd-timeline -->
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
.cd-container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 10%;
  border-radius: 20px;
}
.cd-container::after {
  content: "";
  display: table;
  clear: both;
}

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
  #cd-timeline {
  }
  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}

.cd-timeline-block {
  position: relative;
  margin: 2em 0;
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
  @apply bg-gray-100;
  border-radius: 2px;
  padding: 1em;
  .timeline-content-info {
    background: #2B343A;
    padding: 5px 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.08);
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
.cd-timeline-content h2 {
  color: black;
}
.cd-timeline-content p,
.cd-timeline-content {
  @apply text-gray-600;
  font-size: 13px;
  font-size: 0.8125rem;
}
.cd-timeline-content {
  display: inline-block;
}
.cd-timeline-content p {
  margin: 1em 0;
  line-height: 1.6;
}

.cd-timeline-content::before {
  content: "";
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid #333C42;
}

@media only screen and (min-width: 768px) {
  .cd-timeline-content h2 {
    font-size: 1rem;
  }
  .cd-timeline-content p {
    font-size: 14px;
    @apply text-gray-600;
  }
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-content {
    margin-left: 0;
    width: 36%;
    margin: 0 5%;
  }
  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: #333C42;
  }
  .cd-timeline-content .cd-date {
    position: absolute;
    width: 50%;
    left: 150%;
    top: 6px;
    font-weight: bold;
    text-align: center;
    @apply bg-gray-100;
    font-size: 16px;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    top: 24px;
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color: #333C42;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
    right: 150%;
    text-align: center;
  }
}
</style>
