// Phone menu: below 992px mobile.css slides the sidebar off-screen, so this adds the
// button that brings it back. The button is always created and CSS hides it on desktop,
// because a width check here would leave a rotated phone with no way to open the menu.
(function () {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const btn = document.createElement('button');
    btn.className = 'm-menu-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    let backdrop = null;

    function close() {
        sidebar.classList.remove('m-open');
        btn.setAttribute('aria-expanded', 'false');
        if (backdrop) { backdrop.remove(); backdrop = null; }
    }

    function open() {
        sidebar.classList.add('m-open');
        btn.setAttribute('aria-expanded', 'true');
        backdrop = document.createElement('div');
        backdrop.className = 'm-backdrop';
        backdrop.onclick = close;
        document.body.appendChild(backdrop);
    }

    btn.onclick = () => (sidebar.classList.contains('m-open') ? close() : open());
    document.body.appendChild(btn);

    // Picking a page should put the menu away, not leave it covering the result.
    sidebar.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    // Rotating to a wide screen puts the sidebar back in the layout; drop the overlay.
    window.matchMedia('(min-width: 992px)').addEventListener('change', e => { if (e.matches) close(); });
})();
