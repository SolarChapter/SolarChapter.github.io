function datamap_icons(layer, data, options) {
  var self = this,
    fillData = this.options.fills,
    svg = this.svg;

  if (!data || (data && !data.slice)) {
    throw "Datamaps Error - bubbles must be an array";
  }

  var bubbles = layer.selectAll('image.datamaps-pins').data(data, JSON.stringify);

  bubbles
    .enter()
    .append('image')
    .attr('class', 'datamaps-pin')
    .attr('xlink:href', '/assets/media/marker.png')
    .attr('height', 31.5)
    .attr('width', 21.5)
    .attr('x', function (datum) {
      var latLng;
      if (datumHasCoords(datum)) {
        latLng = self.latLngToXY(datum.latitude, datum.longitude);
      }
      else if (datum.centered) {
        latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
      }
      if (latLng) return latLng[0];
    })
    .attr('y', function (datum) {
      var latLng;
      if (datumHasCoords(datum)) {
        latLng = self.latLngToXY(datum.latitude, datum.longitude);
      }
      else if (datum.centered) {
        latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
      }
      if (latLng) return latLng[1];;
    })

    .on('mouseover', function (datum) {
      var $this = d3.select(this);

      if (options.popupOnHover) {
        self.updatePopup($this, datum, options, svg);
      }
    })
    .on('mouseout', function (datum) {
      var $this = d3.select(this);

      if (options.highlightOnHover) {
        //reapply previous attributes
        var previousAttributes = JSON.parse($this.attr('data-previousAttributes'));
        for (var attr in previousAttributes) {
          $this.style(attr, previousAttributes[attr]);
        }
      }

      d3.selectAll('.datamaps-hoverover').style('display', 'none');
    })
    .on('click', options.onClick)


  bubbles.exit()
    .transition()
    .delay(options.exitDelay)
    .attr("height", 0)
    .remove();

  function datumHasCoords(datum) {
    return typeof datum !== 'undefined' && typeof datum.latitude !== 'undefined' && typeof datum.longitude !== 'undefined';
  }
}