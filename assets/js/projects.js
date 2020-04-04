const pinLatThreshold = -1.55
const pinLongThreshold = 0.75

const data = [
  {
    provinceName: "East Nusa Tenggara",
    regencyName: "Central Sumba",
    radius: 20,
    fillKey: "in_progress",
    latitude: (-9.555181 - pinLatThreshold),
    longitude: (119.649682 - pinLongThreshold),
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
    provinceName: "East Nusa Tenggara",
    regencyName: "Malaka",
    radius: 40,
    fillKey: "in_progress",
    latitude: (-9.512735 - pinLatThreshold),
    longitude: (124.905442 - pinLongThreshold),
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
    provinceName: "East Nusa Tenggara",
    regencyName: "North Timur Tengah",
    radius: 20,
    fillKey: "in_progress",
    latitude: (-9.387957 - pinLatThreshold),
    longitude: (124.561905 - pinLongThreshold),
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
  });

  map.addPlugin('pins', datamap_icons);

  map.pins(data, {
    popupOnHover: true,
    popupTemplate: function(data) {
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
    },
    onClick: function(data) {
      $("#project-table tr").each(function(index, element) {
        if ($(element).data("province") != data.provinceName && $(element).data("regency") != data.regencyName) {
          $(element).css({
            display: "none"
          });
        } else {
          $(element).css({
            display: "table-row"
          });
        }
      });
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

  $("#view-all-projects-button").click(() => {
    $("#project-table tr").css({
      display: "table-row"
    });
  });
});