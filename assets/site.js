/*
 * Fairway Homes — shared site behavior
 * =====================================
 * Loaded on every page, after assets/properties-data.js. Handles the
 * mobile nav menu and renders property cards from FAIRWAY_PROPERTIES so
 * every page (homepage, Available Homes, individual property pages) reads
 * from the same data. See ADDING-A-PROPERTY.md for how to edit the data.
 */

(function () {

  /* ---------- Mobile nav toggle (same on every page) ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Property rendering helpers ---------- */

  var FW_HOUSE_ICON = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M6 22 24 8l18 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M10 20v18h28V20" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>';

  function fwEsc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fwStatusBadge(status) {
    switch (status) {
      case 'available': return { label: 'Available', cls: 'status-available' };
      case 'coming-soon': return { label: 'Coming Soon', cls: 'status-soon' };
      case 'under-contract': return { label: 'Under Contract', cls: 'status-contract' };
      case 'sold': return { label: 'Previously Available', cls: 'status-previous' };
      default: return { label: status || '', cls: '' };
    }
  }

  function fwCardMedia(p) {
    if (p.mainImage) {
      return '<div class="location-media"><img src="' + fwEsc(p.mainImage) + '" alt="' +
        fwEsc(p.city + ', ' + p.state) + '"></div>';
    }
    return '<div class="location-media" aria-hidden="true">' + FW_HOUSE_ICON + '<span>Photo coming soon</span></div>';
  }

  function fwCardCTA(p) {
    if (p.status === 'available') {
      return '<a class="btn btn-primary" href="property.html?id=' + encodeURIComponent(p.id) + '">View Available Home</a>';
    }
    if (p.status === 'coming-soon') {
      return '<a class="btn btn-ghost" href="find-a-home.html">Join the Buyer List</a>';
    }
    return '';
  }

  function fwRenderCard(p) {
    var badge = fwStatusBadge(p.status);
    return '<div class="location-card">' +
      fwCardMedia(p) +
      '<div class="location-body">' +
      '<span class="status-badge ' + badge.cls + '">' + fwEsc(badge.label) + '</span>' +
      '<h3>' + fwEsc(p.city + ', ' + p.state) + '</h3>' +
      fwCardCTA(p) +
      '</div></div>';
  }

  function fwVisible(list) {
    return list.filter(function (p) { return p.status !== 'hidden'; });
  }

  function fwByOrder(a, b) {
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  }

  /* ---------- Homepage featured cards ---------- */
  var homeGrid = document.getElementById('homepage-property-cards');
  if (homeGrid && typeof FAIRWAY_PROPERTIES !== 'undefined') {
    var featured = fwVisible(FAIRWAY_PROPERTIES).filter(function (p) { return p.featured; }).sort(fwByOrder);
    homeGrid.innerHTML = featured.map(fwRenderCard).join('');
  }

  /* ---------- Available Homes page (grouped sections) ---------- */
  if (document.getElementById('section-available') && typeof FAIRWAY_PROPERTIES !== 'undefined') {
    var groups = [
      { status: 'available', sectionId: 'section-available', gridId: 'grid-available' },
      { status: 'coming-soon', sectionId: 'section-coming-soon', gridId: 'grid-coming-soon' },
      { status: 'under-contract', sectionId: 'section-under-contract', gridId: 'grid-under-contract' },
      { status: 'sold', sectionId: 'section-previously-available', gridId: 'grid-previously-available' }
    ];
    groups.forEach(function (g) {
      var list = FAIRWAY_PROPERTIES.filter(function (p) { return p.status === g.status; }).sort(fwByOrder);
      var section = document.getElementById(g.sectionId);
      if (!section) return;
      if (!list.length) {
        section.style.display = 'none';
        return;
      }
      var grid = document.getElementById(g.gridId);
      if (grid) grid.innerHTML = list.map(fwRenderCard).join('');
    });
  }

  /* ---------- Individual property page ---------- */
  var propRoot = document.getElementById('prop-detail');
  if (propRoot && typeof FAIRWAY_PROPERTIES !== 'undefined') {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var p = FAIRWAY_PROPERTIES.find(function (x) { return x.id === id && x.status !== 'hidden'; });
    var notFound = document.getElementById('prop-not-found');

    if (!p) {
      if (notFound) notFound.hidden = false;
      propRoot.hidden = true;
      var titleEl = document.getElementById('prop-title');
      if (titleEl) titleEl.textContent = 'Property Not Found';
      var eyebrowEl = document.getElementById('prop-status-eyebrow');
      if (eyebrowEl) eyebrowEl.textContent = 'Available Homes';
    } else {
      var badge = fwStatusBadge(p.status);
      document.title = p.city + ', ' + p.state + ' — Fairway Homes';

      var eb = document.getElementById('prop-status-eyebrow');
      if (eb) eb.textContent = badge.label;

      var titleEl2 = document.getElementById('prop-title');
      if (titleEl2) titleEl2.textContent = p.city + ', ' + p.state;

      var updatedEl = document.getElementById('prop-updated');
      if (updatedEl) updatedEl.textContent = p.lastUpdated ? ('Last updated ' + p.lastUpdated) : '';

      // Gallery
      var images = (p.galleryImages && p.galleryImages.length) ? p.galleryImages : (p.mainImage ? [p.mainImage] : []);
      var galleryEl = document.getElementById('prop-gallery');
      if (galleryEl) {
        if (images.length) {
          galleryEl.innerHTML = images.map(function (src) {
            return '<div class="gallery-item"><img src="' + fwEsc(src) + '" alt="' + fwEsc(p.city + ', ' + p.state) + '"></div>';
          }).join('');
        } else {
          galleryEl.innerHTML = '<div class="location-media" aria-hidden="true">' + FW_HOUSE_ICON + '<span>Photos coming soon</span></div>';
        }
      }

      // Facts
      var facts = [];
      if (p.priceDisplay) facts.push(['Price', p.priceDisplay]);
      if (p.bedrooms) facts.push(['Bedrooms', p.bedrooms]);
      if (p.bathrooms) facts.push(['Bathrooms', p.bathrooms]);
      if (p.squareFeet) facts.push(['Square Feet', p.squareFeet]);
      if (p.propertyType) facts.push(['Property Type', p.propertyType]);
      var factsEl = document.getElementById('prop-facts');
      if (factsEl) {
        var factsHtml = '<span class="status-badge ' + badge.cls + '">' + fwEsc(badge.label) + '</span>';
        if (facts.length) {
          factsHtml += '<dl class="fact-grid">' + facts.map(function (f) {
            return '<div class="fact"><dt>' + fwEsc(f[0]) + '</dt><dd>' + fwEsc(String(f[1])) + '</dd></div>';
          }).join('') + '</dl>';
        } else {
          factsHtml += '<p class="muted">Additional details for this property will be added soon.</p>';
        }
        factsEl.innerHTML = factsHtml;
      }

      // Description
      var descEl = document.getElementById('prop-description');
      if (descEl) descEl.innerHTML = p.shortDescription ? '<p>' + fwEsc(p.shortDescription) + '</p>' : '';

      // Features
      var featuresEl = document.getElementById('prop-features');
      if (featuresEl) {
        featuresEl.innerHTML = (p.keyFeatures && p.keyFeatures.length)
          ? '<h3>Features</h3><ul class="checklist">' + p.keyFeatures.map(function (f) {
              return '<li>' + fwEsc(f) + '</li>';
            }).join('') + '</ul>'
          : '';
      }

      // Purchase terms
      var termsEl = document.getElementById('prop-terms');
      if (termsEl) {
        termsEl.innerHTML = p.purchaseTermsSummary
          ? '<h3>Purchase Options</h3><p>' + fwEsc(p.purchaseTermsSummary) + '</p>'
          : '';
      }

      // Ask button
      var askBtn = document.getElementById('prop-ask-btn');
      if (askBtn) {
        if (p.status === 'sold') {
          askBtn.style.display = 'none';
        } else {
          askBtn.href = 'mailto:info@frwyhomes.com?subject=' +
            encodeURIComponent('Question about the ' + p.city + ', ' + p.state + ' property');
        }
      }
    }
  }

})();
