const pinLatThreshold=-1.55,pinLongThreshold=.75;$(document).ready(function(){const t=$('#project-table tr:not([data-latitude=""]):not([data-longitude=""])').filter((t,e)=>$(e).data("latitude")&&$(e).data("longitude")).map((t,e)=>{const a=$(e).data("regency"),n={province:$(e).data("province"),regency:a,latitude:$(e).data("latitude")-pinLatThreshold,longitude:$(e).data("longitude")-pinLongThreshold},o=$(`#project-table tr[data-regency="${a}"]:not([data-place=""])`);n.fillKey="Completed";const l={};return o.filter((t,e)=>$(e).data("place")).each((t,e)=>{const a=$(e).data("place");(l[a]=l[a]||[]).push({title:$(e).data("title"),status:$(e).data("status")}),"In Progress"==$(e).data("status")&&(n.fillKey="In Progress")}),n.data=l,n}).toArray(),e=new Datamap({element:document.getElementById("map-container"),scope:"idn",responsive:!0,setProjection:function(t){var e;return e=d3.geo.equirectangular().center([108.8525412,-2.3932963]).scale(1.2*t.offsetWidth).translate([t.offsetWidth/3.3,t.offsetHeight/2]),{path:d3.geo.path().projection(e),projection:e}},fills:{in_progress:"#eed067",completed:"#6eb252",defaultFill:"#dddddd"},geographyConfig:{popupOnHover:!0,popupTemplate:function(t){return`\n          <div class="hover-info">\n            ${t.properties.name}\n          </div>\n        `}}});e.addPlugin("pins",datamap_icons),e.pins(t,{popupOnHover:!0,popupTemplate:function(t){const e=t.data,a=Object.keys(e),n=$("<ul></ul>").attr({"class":"hover-info list-group"});n.append(`<h4 class="card-title">${t.regency}</h4>`);for(let t=0;t<a.length;t++){const o=e[a[t]],l=$("<div></div>").attr({"class":"village-section"});l.append(`<p class="card-title">${a[t]}</p>`);for(let t=0;t<o.length;t++){const e=$("<span></span>").attr({"class":"badge badge-"+("Completed"==o[t].status?"success":"primary")}).text(o[t].status);chaptersHtml=`\n            <li class="list-group-item">\n              ${o[t].title} ${e[0].outerHTML}\n            </li>`,l.append(chaptersHtml)}n.append(l)}return n[0].outerHTML},onClick:function(t){$("#project-table tr").each(function(e,a){$(a).data("province")==t.province&&!$(a).data("regency")||$(a).data("regency")==t.regency?$(a).css({display:"table-row"}):$(a).css({display:"none"})})}}),$(window).on("resize",function(){e.resize()});const a=2;for(let t=0;t<a;t++)$(".stats-background-gallery .slide").clone().appendTo(".stats-background-gallery");$(".clickable-row").click(function(){window.location=$(this).data("href")}),$("#view-all-projects-button").click(()=>{$("#project-table tr").css({display:"table-row"})})});