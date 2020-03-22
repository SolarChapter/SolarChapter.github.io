const data = [
  {
    name: "Malaka",
    radius: 20,
    fillKey: "in_progress",
    latitude: -9.512735,
    longitude: 124.905442,
    data: {
      "As Manulea": [
        {
          title: "Chapter Two: Education for As Manulea",
          status: "Completed"
        }
      ],
      "Biau": [
        {
          title: "Chapter One: Water for Biau",
          status: "In-Progress" 
        }
      ],
      "Umutnana": [
        {
          title: "Chapter One: Water for Umutnana",
          status: "Completed"
        }
      ]
    }
  }
];

$(document).ready(function() {
  // Map
  const map = new Datamap({
    element: document.getElementById("map-container"),
    scope: "idn",
    responsive: true,
    setProjection: function(element, options) {
      var projection, path;
      projection = d3.geo
        .equirectangular()
        .center([108.8525412, -2.3932963]) // Indonesia long lat
        .scale(element.offsetWidth * 1.2)
        .translate([element.offsetWidth / 3.3, element.offsetHeight / 2]);
      path = d3.geo.path().projection(projection);
      return { path: path, projection: projection };
    },
    fills: {
      in_progress: "#eed067",
      completed: "#6eb252",
      defaultFill: "#dddddd"
    },
    geographyConfig: {
      popupOnHover: true,
      popupTemplate: function(geography, data) {
        let popupHtml = `
          <div class="hover-info">
            ${geography.properties.name}
          </div>
        `;
        return popupHtml;
      },
      // dataUrl: "/assets/data/indonesia-topojson-city-regency.json" // With Kabupaten data
    },
    // data: {
    //   "ID.NT": {
    //     name: "Malaka",
    //     status: "In-Progress",
    //     fillKey: "in_progress"
    //   }
    // }
  });

  map.bubbles(data, {
    popupOnHover: true,
    popupTemplate: function(geography, data) {
      const villagesData = data.data;
      const villagesKeys = Object.keys(villagesData);
      const infoHtml = $("<ul></ul>").attr({ class: "hover-info list-group" });
      for (let a = 0; a < villagesKeys.length; a++) {
        const chapter = villagesData[villagesKeys[a]];
        const villageHtml = $("<div></div>").attr({ class: "village-section" })
        villageHtml.append(`<p class="card-title">${villagesKeys[a]}</p>`)
        for (let b = 0; b < chapter.length; b++) {
          const statusHtml = $("<span></span>").attr({
            class: 'badge badge-' + (chapter[b].status == 'Completed' ? 'success' : 'primary')
          }).text(chapter[b].status);
          chaptersHtml = `
            <li class="list-group-item">
              ${chapter[b].title} ${statusHtml[0].outerHTML}
            </li>`;
          villageHtml.append(chaptersHtml);
        }
        infoHtml.append(villageHtml);
      }
      console.log(infoHtml[0].outerHTML);
      return infoHtml[0].outerHTML;
    }
  })

  $(window).on("resize", function() {
    map.resize();
  });

  // Stats Gallery
  const statsGallery = $(".stats-background-gallery");
  const statsGalleryWidthTimes = Math.ceil($(window).width() / statsGallery.width());
  for (let a = 0; a < statsGalleryWidthTimes; a++) {
    $(".stats-background-gallery .slide")
      .clone()
      .appendTo(".stats-background-gallery");
  }
  $.keyframe.define([
    {
      name: "stats-background-gallery",
      "0%": { transform: `translate(0, -50%)` },
      "100%": { transform: `translate(-50%, -50%)` }
    }
  ]);
  statsGallery.playKeyframe({
    name: "stats-background-gallery",
    duration: "120s",
    timingFunction: "linear",
    iterationCount: "infinite"
  });

  // Project table
  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });
});