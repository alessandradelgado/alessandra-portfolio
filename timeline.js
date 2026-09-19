// Interactive timeline: clicking a category swaps the detail panel.
// This is user-triggered motion (a click), not autoplay, so it's fine
// to keep it simple and instant rather than animated.

(function () {
  const categories = [
    {
      title: 'Corporate Sales & Account Management',
      company: 'Daewoo, Iberia',
      role: 'Corporate Sales Representative / Account Manager',
      responsibilities: 'Managed strategic retail and corporate accounts; negotiated commercial agreements, rebate structures, and incentive programs; delivered sales training.',
      competencies: 'Negotiation, B2B relationship management, market analysis.',
      results: '~CAD 560K in monthly sales managed; renewed key corporate agreements despite strong competition.'
    },
    {
      title: 'Product Management & Marketing',
      company: 'BSH',
      role: 'Marketing Coordinator \u2192 Product Manager',
      responsibilities: 'Managed product portfolio, budget, and launches; led B2B e-commerce relaunch; coordinated cross-functional teams.',
      competencies: 'Product strategy, budget management, cross-functional leadership.',
      results: '79 SKUs managed, 50% average profit margin, ~$110K CAD annual marketing budget.'
    },
    {
      title: 'Entrepreneurship',
      company: 'Good Rentals',
      role: 'Founder & Owner',
      responsibilities: 'Built brand, website, content, and paid media strategy from zero; managed client and landlord relationships.',
      competencies: 'Brand building, digital marketing, content creation, resilience.',
      results: '111 families helped into housing; over 100 lease agreements secured.'
    },
    {
      title: 'Customer Experience & Property Management',
      company: 'CAPREIT',
      role: 'Property Specialist',
      responsibilities: 'Managed leasing across 18 buildings; tenant screening, inspections, vendor coordination.',
      competencies: 'Customer service, compliance, organization, conflict resolution.',
      results: 'Accurate leasing documentation and vacancy reporting across a large residential portfolio.'
    },
    {
      title: 'Digital Marketing & Creative Projects',
      company: 'Living Victoria, EcoSmart',
      role: 'Digital Marketing Consultant / Content Creator',
      responsibilities: 'Managed paid and organic campaigns; produced video and content; tracked and optimized performance.',
      competencies: 'Paid media, content strategy, analytics, on-camera presence.',
      results: 'Conversion rate 0.20% \u2192 3.69%; 69% lower cost per conversion.'
    }
  ];

  const list = document.getElementById('timelineList');
  const detail = document.getElementById('timelineDetail');
  if (!list || !detail) return;

  function renderDetail(item) {
    detail.innerHTML =
      '<div class="timeline-detail-role">' + item.role + '</div>' +
      '<dt>Key responsibilities</dt><dd>' + item.responsibilities + '</dd>' +
      '<dt>Related competencies</dt><dd>' + item.competencies + '</dd>' +
      '<dt>Results</dt><dd>' + item.results + '</dd>';
  }

  function renderList(activeIndex) {
    list.innerHTML = '';
    categories.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'timeline-item' + (i === activeIndex ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
      btn.innerHTML = item.title + '<span class="timeline-company">' + item.company + '</span>';
      btn.addEventListener('click', () => {
        renderList(i);
        renderDetail(categories[i]);
      });
      list.appendChild(btn);
    });
  }

  renderList(0);
  renderDetail(categories[0]);
})();
