(function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.primary-nav__list');
    const mobileQuery = window.matchMedia('(max-width: 860px)');
    const currentYearEl = document.getElementById('current-year');

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    if (!navToggle || !navList) return;

    const setNavForViewport = (query) => {
        const mediaQuery = 'matches' in query ? query : query.target;
        const isMobile = mediaQuery.matches;
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

        if (!isMobile) {
            document.body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navList.removeAttribute('aria-hidden');
            return;
        }

        navList.setAttribute('aria-hidden', String(!isExpanded));
        document.body.classList.toggle('nav-open', isExpanded);
    };

    const toggleNav = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        navToggle.setAttribute('aria-expanded', String(newState));
        setNavForViewport(mobileQuery);
    };

    setNavForViewport(mobileQuery);

    navToggle.addEventListener('click', toggleNav);

    navList.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
            navToggle.setAttribute('aria-expanded', 'false');
            setNavForViewport(mobileQuery);
        }
    });

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', setNavForViewport);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(setNavForViewport);
    }
})();
