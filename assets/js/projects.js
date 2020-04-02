const data = [
  {
    name: "Central Sumba",
    radius: 20,
    fillKey: "in_progress",
    latitude: -9.555181,
    longitude: 119.649682,
    data: {
      "Anapalu": [
        {
          title: "Chapter One: Water for Anapalu",
          status: "In-Progress"
        }
      ],
    }
  },
  {
    name: "Malaka",
    radius: 40,
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
      "Nibaaf": [
        {
          title: "Chapter One: Water for Nibaaf",
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
  },
  {
    name: "North Timur Tengah",
    radius: 20,
    fillKey: "in_progress",
    latitude: -9.387957,
    longitude: 124.561905,
    data: {
      "Biau": [
        {
          title: "Chapter One: Water for Biau",
          status: "In-Progress"
        }
      ],
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

      return infoHtml[0].outerHTML;
    }
  })

  $(window).on("resize", function() {
    map.resize();
  });

  // Stats Gallery
  // This is to cap the number of clone times because jQuery may not always be ready to calculate width and get the correct number of clones
  const cloneTimes = 2;
  // const statsGallery = $(".stats-background-gallery");
  // const statsGalleryWidthTimes = Math.ceil($(window).width() / statsGallery.width());
  for (let a = 0; a < cloneTimes; a++) {
    $(".stats-background-gallery .slide")
      .clone()
      .appendTo(".stats-background-gallery");
  }
  
  // Project table
  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });
});