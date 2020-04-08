const pinLatThreshold = -1.55
const pinLongThreshold = 0.75

$(document).ready(function() {
  // Get projects from the table
  const data = $('#project-table tr:not([data-latitude=""]):not([data-longitude=""])')
      .filter((i, tr) => $(tr).data("latitude") && $(tr).data("longitude"))
      .map((i, tr) => {
        // Group projects by regencies
        const regencyName = $(tr).data("regency");
        const regencies = {
          province: $(tr).data("province"),
          regency: regencyName,
          latitude: $(tr).data("latitude") - pinLatThreshold,
          longitude: $(tr).data("longitude") - pinLongThreshold
        };
        const places = $(`#project-table tr[data-regency="${regencyName}"]:not([data-place=""])`);
        regencies['fillKey'] = "Completed";
        // Group projects by places
        const groupedPlaces = {};
        places
          .filter((i, place) => $(place).data('place'))
          .each((i, place) => {
            const placeName = $(place).data('place');
            (groupedPlaces[placeName] = groupedPlaces[placeName] || []).push({
              title: $(place).data('title'),
              status: $(place).data('status')
            });
            if ($(place).data("status") == "In Progress") {
              regencies["fillKey"] = "In Progress";
            }
          });
        regencies['data'] = groupedPlaces;
        return regencies;
      })
      .toArray();

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
    },
  });

  map.addPlugin('pins', datamap_icons);

  map.pins(data, {
    popupOnHover: true,
    popupTemplate: function(data) {
      const villagesData = data.data;
      const villagesKeys = Object.keys(villagesData);
      const infoHtml = $("<ul></ul>").attr({ class: "hover-info list-group" });
      infoHtml.append(`<h4 class="card-title">${data.regency}</h4>`);
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
        if (($(element).data("province") == data.province && !$(element).data("regency")) || $(element).data("regency") == data.regency) {
          $(element).css({
            display: "table-row"
          });
        } else {
          $(element).css({
            display: "none"
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