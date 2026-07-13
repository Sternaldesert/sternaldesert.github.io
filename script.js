function toggleSidebar(isOpen) {
  const sidebar = document.getElementById('Mobile-menu');
  const backdrop = document.getElementById('Mobile-menu-blur');
  
  if (isOpen) {
    // Add tailwind classes on the fly
    sidebar.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Disables page scrolling
  } else {
    sidebar.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}
